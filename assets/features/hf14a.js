// HF14A 扫码器 view — scan 13.56MHz tags, read/clone anti-collision data (UID),
// view/change HF14A settings, and send raw APDU commands.
import { ultra, run, toast, toBuf, hex, Buffer, Hf14aBccMode, Hf14aCascadeLevelMode, Hf14aRatsMode } from '../app.js'

export function initHf14a () {
  const view = document.getElementById('view-hf14a')
  const $ = id => view.querySelector('#' + id)

  $('hf-scan').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    $('hf-state').textContent = '扫描中…'
    const tags = await run('扫描卡片', u => u.cmdHf14aScan())
    if (!tags) { $('hf-state').textContent = '失败'; return }
    if (!tags.length) { $('hf-tags').innerHTML = '<p class="hint">未检测到卡片</p>'; $('hf-state').textContent = '无卡片'; return }
    let html = '<table><thead><tr><th>#</th><th>UID</th><th>ATQA</th><th>SAK</th><th>ATS</th></tr></thead><tbody>'
    tags.forEach((t, i) => {
      html += `<tr><td>${i}</td><td class="mono">${hex(t.uid)}</td><td class="mono">${hex(t.atqa)}</td><td class="mono">${hex(t.sak)}</td><td class="mono">${t.ats?.length ? hex(t.ats) : '—'}</td></tr>`
    })
    html += '</tbody></table>'
    $('hf-tags').innerHTML = html
    $('hf-state').textContent = `检测到 ${tags.length} 张卡`
    toast('扫描完成', 'ok')
  })

  // ---- anti-collision data (clone UID) ----
  $('hf-anticoll-get').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    const d = await run('读取防冲突数据', u => u.cmdHf14aGetAntiCollData())
    if (!d) return
    $('hf-uid').value = d.uid?.length ? hex(d.uid) : ''
    $('hf-atqa').value = d.atqa?.length ? hex(d.atqa) : ''
    $('hf-sak').value = d.sak?.length ? hex(d.sak) : ''
    $('hf-ats').value = d.ats?.length ? hex(d.ats) : ''
    toast('已读取防冲突数据', 'ok')
  })
  $('hf-anticoll-set').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    let uid, atqa, sak, ats
    try {
      uid = toBuf($('hf-uid').value)
      if (![4, 7, 10].includes(uid.length)) throw new Error('UID 需为 4/7/10 字节')
      atqa = toBuf($('hf-atqa').value); if (atqa.length !== 2) throw new Error('ATQA 需为 2 字节')
      sak = toBuf($('hf-sak').value); if (sak.length !== 1) throw new Error('SAK 需为 1 字节')
      ats = $('hf-ats').value.trim() ? toBuf($('hf-ats').value) : Buffer.alloc(0)
    } catch (e) { toast(e.message, 'err'); return }
    const ok = await run('写入防冲突数据', u => u.cmdHf14aSetAntiCollData({ uid, atqa, sak, ats }))
    if (ok) toast('已写入防冲突数据（设备将模拟该 UID）', 'ok')
  })

  // ---- HF14A settings ----
  $('hf-settings-get').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    const s = await run('读取 HF14A 设置', u => u.cmdHf14aGetSettings())
    if (!s) return
    $('hf-bcc').value = String(s.bcc)
    $('hf-cl2').value = String(s.cl2)
    $('hf-cl3').value = String(s.cl3)
    $('hf-rats').value = String(s.rats)
    toast('已读取 HF14A 设置', 'ok')
  })
  $('hf-settings-set').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    const ok = await run('设置 HF14A', u => u.cmdHf14aSetSettings({
      bcc: +$('hf-bcc').value, cl2: +$('hf-cl2').value, cl3: +$('hf-cl3').value, rats: +$('hf-rats').value,
    }))
    if (ok) toast('HF14A 设置已应用', 'ok')
  })

  // ---- raw command ----
  $('hf-raw-send').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    let data
    try { data = toBuf($('hf-raw-in').value) } catch (e) { toast('数据 hex 非法', 'err'); return }
    if (!data.length) { toast('请输入指令数据', 'warn'); return }
    const res = await run('发送原始指令', u => u.cmdHf14aRaw({
      data,
      appendCrc: $('hf-raw-crc').checked,
      autoSelect: $('hf-raw-select').checked,
      waitResponse: true,
    }))
    if (res === null) return
    const out = Buffer.isBuffer(res) ? hex(res) : JSON.stringify(res)
    $('hf-raw-out').textContent = `响应 (${out.length / 2} 字节):\n${out || '(空)'}`
    toast('原始指令完成', 'ok')
  })
}

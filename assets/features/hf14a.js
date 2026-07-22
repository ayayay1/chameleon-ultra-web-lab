// HF14A 高频扫码器 view — 13.56MHz 卡片连续扫描、各扇区密钥字典扫描、
// 读取可读扇区数据，并一键带入「密钥侦测」进行字典爆破 / Nested / Static 攻击。
import { ultra, run, toast, toBuf, hex, Buffer, Mf1KeyType, Hf14aBccMode, Hf14aCascadeLevelMode, Hf14aRatsMode, goView } from '../app.js'

// 常用 MIFARE 默认密钥字典（16 进制，每项为 6 字节）。
const DICTS = {
  default: [
    'FFFFFFFFFFFF', 'A0A1A2A3A4A5', 'B0B1B2B3B4B5', '000000000000',
    'D3F7D3F7D3F7', '123456789ABC', 'A1B2C3D4E5F6', 'AABBCCddeeff'.toUpperCase(),
  ],
  extended: [
    'FFFFFFFFFFFF', 'A0A1A2A3A4A5', 'B0B1B2B3B4B5', '000000000000',
    'D3F7D3F7D3F7', '123456789ABC', '123456ABCDEF', 'A1B2C3D4E5F6',
    'AABBCCddeeff'.toUpperCase(), '1A2B3C4D5E6F', 'ABCDEF123456', '010203040506',
    '1234567890AB', '4B56972CEC9F', 'B119021B3190', 'E0E1E2E3E4E5',
  ],
}

export function initHf14a () {
  const view = document.getElementById('view-hf14a')
  const $ = id => view.querySelector('#' + id)

  let hfTimer = null        // 高频连续扫描定时器
  let lastFound = []        // [{ sector, key }] 最近一次各扇区密钥扫描命中

  function stopHf () { if (hfTimer) { clearInterval(hfTimer); hfTimer = null } }

  // ---- 扫描（单次 / 高频静默）----
  async function doScan (silent) {
    try {
      const tags = await ultra.cmdHf14aScan()
      if (!tags || !tags.length) {
        $('hf-tags').innerHTML = '<p class="hint">未检测到卡片</p>'
        $('hf-state').textContent = '无卡片'
        return
      }
      let html = '<table><thead><tr><th>#</th><th>UID</th><th>ATQA</th><th>SAK</th><th>ATS</th></tr></thead><tbody>'
      tags.forEach((t, i) => {
        html += `<tr><td>${i}</td><td class="mono">${hex(t.uid)}</td><td class="mono">${hex(t.atqa)}</td><td class="mono">${hex(t.sak)}</td><td class="mono">${t.ats?.length ? hex(t.ats) : '—'}</td></tr>`
      })
      html += '</tbody></table>'
      $('hf-tags').innerHTML = html
      $('hf-state').textContent = `检测到 ${tags.length} 张卡`
      if (!silent) toast('扫描完成', 'ok')
    } catch (e) {
      if (!silent) toast('扫描失败: ' + String(e?.message ?? e), 'err')
      $('hf-state').textContent = '失败'
    }
  }

  $('hf-scan').addEventListener('click', () => doScan(false))

  // 高频连续扫描：勾选后每隔约 700ms 自动重扫。
  $('hf-hfscan').addEventListener('change', async (e) => {
    if (e.target.checked) {
      if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); e.target.checked = false; return }
      toast('高频连续扫描已开启', 'ok')
      await doScan(true)
      hfTimer = setInterval(() => doScan(true).catch(() => {}), 700)
    } else {
      stopHf()
      toast('高频连续扫描已停止', 'warn')
    }
  })

  // ---- 各扇区密钥字典扫描 ----
  $('hf-sector-scan').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    // 先确认有卡在场
    const pre = await run('预扫描卡片', u => u.cmdHf14aScan())
    if (!pre || !pre.length) { $('hf-sector-state').textContent = '未检测到卡片'; return }
    const dict = DICTS[$('hf-dict').value] || DICTS.default
    let keys
    try { keys = dict.map(k => toBuf(k)) } catch (e) { toast('字典 hex 非法: ' + e.message, 'err'); return }
    const mask = Buffer.alloc(10)
    for (let i = 0; i < 16; i++) mask[Math.floor(i / 8)] |= (1 << (7 - (i % 8)))
    $('hf-sector-state').textContent = '扫描中…'
    const res = await run('各扇区密钥扫描', u => u.cmdMf1CheckKeysOfSectors({ keys, mask }))
    if (res === null) { $('hf-sector-state').textContent = '失败'; return }
    const rows = []
    let foundCount = 0
    lastFound = []
    for (let i = 0; i < 16; i++) {
      const hit = res.found.readBitMSB(i) === 1
      const key = hit ? res.sectorKeys[i] : null
      if (hit) { foundCount++; lastFound.push({ sector: i, key }) }
      rows.push(`<tr><td>${i}</td><td class="${hit ? 'ok-text' : 'err-text'}">${hit ? '命中' : '—'}</td><td class="mono">${hit ? hex(key) : ''}</td></tr>`)
    }
    $('hf-sector-table').innerHTML =
      `<table><thead><tr><th>扇区</th><th>结果</th><th>命中密钥</th></tr></thead><tbody>${rows.join('')}</tbody></table>`
    $('hf-sector-state').textContent = `命中 ${foundCount}/16 扇区`
    toast('各扇区密钥扫描完成', 'ok')
  })

  // ---- 下一步：带入密钥侦测（Nested / Static / 字典爆破）----
  $('hf-go-mfkey').addEventListener('click', () => {
    if (!lastFound.length) { toast('请先完成各扇区密钥扫描', 'warn'); return }
    const first = lastFound[0]
    const block = first.sector * 4
    const keyHex = hex(first.key)
    const ak = document.getElementById('acq-key'); if (ak) ak.value = keyHex
    const ab = document.getElementById('acq-block'); if (ab) ab.value = String(block)
    const at = document.getElementById('acq-keytype'); if (at) at.value = '0' // KEY_A
    const mk = document.getElementById('mfkey-keys')
    if (mk) mk.value = (DICTS[$('hf-dict').value] || DICTS.default).join('\n')
    goView('mfkey')
    toast('已带入首个命中密钥到密钥侦测', 'ok')
  })

  // ---- 下一步：用命中密钥读取可读扇区数据 ----
  $('hf-go-read').addEventListener('click', async () => {
    if (!lastFound.length) { toast('请先完成各扇区密钥扫描', 'warn'); return }
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    let out = ''
    for (const { sector, key } of lastFound) {
      out += `=== 扇区 ${sector} (key ${hex(key)}) ===\n`
      for (let b = 0; b < 4; b++) {
        const block = sector * 4 + b
        let data = null
        for (const kt of [Mf1KeyType.KEY_A, Mf1KeyType.KEY_B]) {
          try { data = await ultra.cmdMf1ReadBlock({ block, keyType: kt, key }); break } catch { /* try other type */ }
        }
        out += `  块${block}: ${data ? hex(data) : '(读失败)'}\n`
      }
    }
    $('hf-read-out').textContent = out
    toast('可读扇区数据已读取', 'ok')
  })

  // ---- 防冲突数据 (克隆 UID) ----
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

  // 断开时停止高频扫描
  ultra.emitter.on('disconnected', stopHf)
}

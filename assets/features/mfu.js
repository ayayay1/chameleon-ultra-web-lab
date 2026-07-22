// MIFARE Ultralight / NTAG (MFU) 模块。
// 所有命令作用于「激活卡槽」的 MFU 模拟数据，需先把卡槽设为 NTAG 类型并处于 TAG(模拟)模式。
import { onConnected, ultra, run, toast, toBuf, hex, Slot, TagType, DeviceMode, MfuEmuWriteMode } from '../app.js'

export function initMfu () {
  const view = document.getElementById('view-mfu')
  const $ = id => view.querySelector('#' + id)
  const u = ultra

  function setState (s) { const el = $('mfu-state'); if (el) el.textContent = s }

  async function ensureTag () { await u.cmdChangeDeviceMode(DeviceMode.TAG) }
  async function ensureMfuSlot () {
    const active = await u.cmdSlotGetActive()
    await u.cmdSlotChangeTagType(active, TagType.NTAG_216)
    await u.cmdSlotSetActive(active)
  }

  $('mfu-set-tag').addEventListener('click', async () => {
    await run('设置卡槽为 NTAG', async () => { await ensureMfuSlot(); return true })
    toast('已将激活槽设为 NTAG216', 'ok')
  })

  $('mfu-read-info').addEventListener('click', async () => {
    await run('读取 MFU 信息', async () => {
      await ensureTag()
      const [pageSize, version, signature, counter, settings, magic] = await Promise.all([
        u.cmdMfuGetEmuPageSize().catch(() => null),
        u.cmdMfuGetEmuVersion().catch(() => null),
        u.cmdMfuGetEmuSignature().catch(() => null),
        u.cmdMfuGetEmuCounter(0).catch(() => null),
        u.cmdMfuGetEmuSettings().catch(() => null),
        u.cmdMfuGetMagicMode().catch(() => null),
      ])
      $('mfu-info').innerHTML = `
        <div>页数 (page count): <b>${pageSize ?? '—'}</b></div>
        <div>版本 (8B): <span class="mono">${version ? hex(version) : '—'}</span></div>
        <div>签名 (32B): <span class="mono" style="word-break:break-all">${signature ? hex(signature) : '—'}</span></div>
        <div>计数器 (addr0): <b>${counter ? counter.counter : '—'}</b>${counter && counter.tearing ? ' ⚠撕裂' : ''}</div>
        <div>设置: 侦测=${settings ? settings.detection : '—'} · UID可写=${settings ? settings.uid : '—'} · 写模式=${settings ? MfuEmuWriteMode[settings.write] : '—'}</div>
        <div>魔术模式: <b>${magic ?? '—'}</b></div>`
    })
  })

  $('mfu-read-pages').addEventListener('click', async () => {
    const offset = +$('mfu-read-offset').value
    const count = Math.max(1, Math.min(128, +$('mfu-read-count').value))
    await run('读取 MFU 页', async () => {
      await ensureTag()
      const data = await u.cmdMfuReadEmuPage(offset, count)
      const lines = []
      for (let i = 0; i < data.length; i += 4) {
        lines.push(`<div><span class="mono" style="color:var(--muted)">p${String(offset + i / 4).padStart(3)}</span> ${hex(data.subarray(i, i + 4))}</div>`)
      }
      $('mfu-read-out').innerHTML = lines.join('')
    })
  })

  $('mfu-write-page').addEventListener('click', async () => {
    const offset = +$('mfu-write-offset').value
    let data
    try { data = toBuf($('mfu-write-data').value) } catch (e) { toast(e.message, 'err'); return }
    if (data.length < 4 || data.length % 4 !== 0) { toast('写入数据需为 4 字节的倍数（最少 4 字节）', 'warn'); return }
    await run('写入 MFU 页', async () => { await ensureTag(); await u.cmdMfuWriteEmuPage(offset, data); return true })
    toast('已写入', 'ok')
  })

  $('mfu-apply-settings').addEventListener('click', async () => {
    await run('应用 MFU 设置', async () => {
      await ensureTag()
      await u.cmdMfuSetWriteMode(+$('mfu-writemode').value)
      await u.cmdMfuSetMagicMode($('mfu-magic').checked ? 1 : 0)
      await u.cmdMfuSetDetectionEnable($('mfu-detection').checked ? 1 : 0)
      return true
    })
    toast('已应用', 'ok')
  })

  $('mfu-set-counter').addEventListener('click', async () => {
    const addr = +$('mfu-counter-addr').value
    const counter = +$('mfu-counter-val').value
    await run('设置计数器', async () => { await ensureTag(); await u.cmdMfuSetEmuCounter({ addr, counter }); return true })
    toast('已设置计数器', 'ok')
  })

  $('mfu-set-version').addEventListener('click', async () => {
    let v
    try { v = toBuf($('mfu-version').value) } catch (e) { toast(e.message, 'err'); return }
    if (v.length !== 8) { toast('版本需为 8 字节（16 hex）', 'warn'); return }
    await run('设置版本', async () => { await ensureTag(); await u.cmdMfuSetEmuVersion(v); return true })
    toast('已设置版本', 'ok')
  })

  $('mfu-set-sign').addEventListener('click', async () => {
    let s
    try { s = toBuf($('mfu-sign').value) } catch (e) { toast(e.message, 'err'); return }
    if (s.length !== 32) { toast('签名需为 32 字节（64 hex）', 'warn'); return }
    await run('设置签名', async () => { await ensureTag(); await u.cmdMfuSetEmuSignature(s); return true })
    toast('已设置签名', 'ok')
  })

  $('mfu-det-read').addEventListener('click', async () => {
    await run('读取侦测日志', async () => {
      const count = await u.cmdMfuGetDetectionCount()
      $('mfu-det-count').textContent = `日志数: ${count}`
      if (!count) { $('mfu-det-list').innerHTML = '<div class="muted">无日志</div>'; return }
      const logs = await u.cmdMfuGetDetectionLogs(0)
      $('mfu-det-list').innerHTML = logs.map((b, i) =>
        `<div><span class="mono" style="color:var(--muted)">#${i}</span> ${hex(b)}</div>`).join('')
    })
  })

  onConnected(() => {})
}

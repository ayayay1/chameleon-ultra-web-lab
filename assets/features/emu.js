// MIFARE 卡片模拟 view — active slot switching, emulator options
// (Gen1a/Gen2/anti-collision/write-mode/detection), and dump import/export
// to the emulated slot (chunked MF1 EMU block read/write).
import { onConnected, ultra, run, toast, toBuf, hex, Buffer, Mf1EmuWriteMode } from '../app.js'

export function initEmu () {
  const view = document.getElementById('view-emu')
  const $ = id => view.querySelector('#' + id)
  const BLOCKS = 64

  // ---- slot selector ----
  const slotSel = $('emu-slot')
  for (let i = 0; i < 8; i++) {
    const o = document.createElement('option'); o.value = i; o.textContent = `卡槽 ${i + 1}`; slotSel.appendChild(o)
  }
  async function setActiveSlot (slot) {
    if (!await run('设置激活槽', () => ultra.cmdSlotSetActive(slot))) return false
    $('emu-active-badge').textContent = `激活: 卡槽 ${slot + 1}`
    return true
  }

  // ---- read emulator settings ----
  async function refreshSettings () {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    try {
      const [g1, g2, ac, det, wm] = await Promise.all([
        ultra.cmdMf1GetGen1aMode(), ultra.cmdMf1GetGen2Mode(),
        ultra.cmdMf1GetAntiCollMode(), ultra.cmdMf1GetDetectionEnable(),
        ultra.cmdMf1GetWriteMode(),
      ])
      $('emu-gen1a').checked = !!g1
      $('emu-gen2').checked = !!g2
      $('emu-anticoll').checked = !!ac
      $('emu-detection').checked = !!det
      $('emu-writemode').value = String(wm)
      toast('已读取模拟设置', 'ok')
    } catch (e) { toast(`读取模拟设置失败: ${String(e?.message ?? e)}`, 'err') }
  }
  $('emu-refresh-settings').addEventListener('click', refreshSettings)

  $('emu-set-active').addEventListener('click', () => setActiveSlot(+slotSel.value))
  $('emu-apply-settings').addEventListener('click', async () => {
    const slot = +slotSel.value
    if (!await setActiveSlot(slot)) return
    try {
      await Promise.all([
        ultra.cmdMf1SetGen1aMode($('emu-gen1a').checked),
        ultra.cmdMf1SetGen2Mode($('emu-gen2').checked),
        ultra.cmdMf1SetAntiCollMode($('emu-anticoll').checked),
        ultra.cmdMf1SetDetectionEnable($('emu-detection').checked),
        ultra.cmdMf1SetWriteMode(+$('emu-writemode').value),
      ])
      toast('模拟设置已应用', 'ok')
    } catch (e) { toast(`应用模拟设置失败: ${String(e?.message ?? e)}`, 'err') }
  })

  // ---- dump import / export (chunked) ----
  function setState (s) { $('emu-state').textContent = s }
  $('emu-load').addEventListener('click', () => $('emu-file').click())
  $('emu-file').addEventListener('change', async (e) => {
    const f = e.target.files[0]; if (!f) return
    const buf = new Uint8Array(await f.arrayBuffer())
    if (buf.length < BLOCKS * 16) { toast(`文件过短：${buf.length} 字节，需 ${BLOCKS * 16}`, 'err'); e.target.value = ''; return }
    const slot = +slotSel.value
    if (!await setActiveSlot(slot)) { e.target.value = ''; return }
    setState(`写入模拟槽 ${slot + 1} …`)
    for (let base = 0; base < BLOCKS; base += 32) {
      const count = Math.min(32, BLOCKS - base)
      const data = Buffer.from(buf.slice(base * 16, (base + count) * 16))
      const ok = await run('写入模拟槽', u => u.cmdMf1WriteEmuBlockData({ blockIndex: base, data }))
      if (!ok) { setState('写入失败'); e.target.value = ''; return }
    }
    setState(`已载入 ${BLOCKS} 块到模拟槽 ${slot + 1}`)
    toast('Dump 已写入模拟槽', 'ok')
    e.target.value = ''
  })
  $('emu-save').addEventListener('click', async () => {
    const slot = +slotSel.value
    if (!await setActiveSlot(slot)) return
    setState(`读取模拟槽 ${slot + 1} …`)
    const out = Buffer.alloc(BLOCKS * 16)
    for (let base = 0; base < BLOCKS; base += 32) {
      const count = Math.min(32, BLOCKS - base)
      const buf = await run('读取模拟槽', u => u.cmdMf1ReadEmuBlockData({ blockIndex: base, blockCount: count }))
      if (!buf) { setState('读取失败'); return }
      for (let i = 0; i < count; i++) out.set(Buffer.from(buf.slice(i * 16, i * 16 + 16)), (base + i) * 16)
    }
    const blob = new Blob([out], { type: 'application/octet-stream' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `chameleon-slot${slot + 1}-mf1k.dump`
    a.click(); URL.revokeObjectURL(a.href)
    setState(`已导出模拟槽 ${slot + 1} 为 .dump`)
    toast('已保存为 .dump', 'ok')
  })
  $('emu-open-editor').addEventListener('click', () => { location.hash = '#view-mifare' })

  onConnected(refreshSettings)
}

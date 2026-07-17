// MIFARE 1K editor view — wired once at SPA load. Shares the single
// ChameleonUltra connection from ../app.js, so it stays connected when
// switching tabs.
import { onConnected, ultra, run, toast, toBuf, hex, Buffer } from '../app.js'

export function initMifare1k () {
  const view = document.getElementById('view-mifare')
  const $ = id => view.querySelector('#' + id)
  const BLOCKS = 64
  const state = []   // parsed buffers per block (for export before write)
  for (let i = 0; i < BLOCKS; i++) state.push(Buffer.alloc(16))

  // ---- build slot selector + block grid ----
  const slotSel = $('slot')
  for (let i = 0; i < 8; i++) {
    const o = document.createElement('option'); o.value = i; o.textContent = `卡槽 ${i + 1}`; slotSel.appendChild(o)
  }

  const blocksEl = $('blocks')
  function buildGrid () {
    let html = ''
    for (let b = 0; b < BLOCKS; b++) {
      const sector = Math.floor(b / 4)
      const trailer = (b % 4 === 3)
      html += `<div class="blk-row${trailer ? ' trailer' : ''}" data-block="${b}">
        <span class="blk-idx">#${b}</span>
        <span class="sector-tag">S${sector}${trailer ? ' ·尾' : ''}</span>
        <input class="blk-hex mono" data-block="${b}" maxlength="32" spellcheck="false" placeholder="00000000000000000000000000000000">
        <button class="small ghost blk-write" data-block="${b}">写</button>
      </div>`
    }
    blocksEl.innerHTML = html
  }
  buildGrid()

  function blkInput (b) { return blocksEl.querySelector(`.blk-hex[data-block="${b}"]`) }
  function parseBlock (b) {
    const v = blkInput(b).value.replace(/\s+/g, '')
    if (v.length !== 32) throw new Error(`块 ${b} 需为 32 个 hex 字符（16 字节）`)
    return toBuf(v)
  }
  function fillInputs () {
    for (let b = 0; b < BLOCKS; b++) blkInput(b).value = hex(state[b])
  }

  function setActive (slot) {
    return run('设置激活槽', () => ultra.cmdSlotSetActive(slot))
  }

  // ---- read all ----
  $('read-all').addEventListener('click', async () => {
    const slot = +slotSel.value
    if (!await setActive(slot)) return
    setState(`读取卡槽 ${slot + 1} …`)
    for (let base = 0; base < BLOCKS; base += 32) {
      const count = Math.min(32, BLOCKS - base)
      const buf = await run(`读取块 ${base}–${base + count - 1}`, (u) =>
        u.cmdMf1ReadEmuBlockData({ blockIndex: base, blockCount: count }))
      if (!buf) { setState('读取失败'); return }
      for (let i = 0; i < count; i++) state[base + i] = Buffer.from(buf.slice(i * 16, i * 16 + 16))
    }
    fillInputs()
    setState(`已读取 64 块`)
    toast('已读取全部 64 块', 'ok')
  })

  // ---- write all (32-block chunks) ----
  $('write-all').addEventListener('click', async () => {
    const slot = +slotSel.value
    if (!await setActive(slot)) return
    const chunks = []
    for (let base = 0; base < BLOCKS; base += 32) {
      const count = Math.min(32, BLOCKS - base)
      const data = Buffer.alloc(count * 16)
      for (let i = 0; i < count; i++) {
        let buf
        try { buf = parseBlock(base + i) } catch (e) { toast(e.message, 'err'); return }
        buf.copy(data, i * 16)
        state[base + i] = Buffer.from(buf)
      }
      chunks.push({ base, data })
    }
    for (const c of chunks) {
      setState(`写入块 ${c.base}–${c.base + c.data.length / 16 - 1} …`)
      const ok = await run('写入块', (u) =>
        u.cmdMf1WriteEmuBlockData({ blockIndex: c.base, data: c.data }))
      if (!ok) { setState('写入失败'); return }
    }
    setState('已写入 64 块')
    toast('已写入全部 64 块', 'ok')
  })

  // ---- per-block write ----
  blocksEl.addEventListener('click', async (e) => {
    if (!e.target.classList.contains('blk-write')) return
    const b = +e.target.dataset.block
    const slot = +slotSel.value
    if (!await setActive(slot)) return
    let buf
    try { buf = parseBlock(b) } catch (err) { toast(err.message, 'err'); return }
    const ok = await run('写入块', (u) =>
      u.cmdMf1WriteEmuBlockData({ blockIndex: b, data: buf }))
    if (ok) { state[b] = Buffer.from(buf); toast(`块 ${b} 已写入`, 'ok') }
  })

  // ---- clear all ----
  $('clear-all').addEventListener('click', () => {
    for (let b = 0; b < BLOCKS; b++) { state[b] = Buffer.alloc(16); blkInput(b).value = '' }
    setState('已清空')
  })

  // ---- apply default key to sector trailers ----
  $('apply-key').addEventListener('click', () => {
    let key
    try { key = toBuf($('defkey').value) } catch { toast('默认密钥 hex 非法', 'err'); return }
    if (key.length !== 6) { toast('密钥需为 6 字节（12 hex）', 'warn'); return }
    for (let s = 0; s < 16; s++) {
      const b = s * 4 + 3
      const inp = blkInput(b)
      let v = inp.value.replace(/\s+/g, '')
      if (v.length !== 32) v = (v + '0'.repeat(32)).slice(0, 32)
      const bytes = Buffer.from(v, 'hex')
      key.copy(bytes, 0)   // Key A (0–5)
      key.copy(bytes, 10)  // Key B (10–15)
      inp.value = hex(bytes)
      state[b] = Buffer.from(bytes)
    }
    setState('默认密钥已填入尾块（未写入设备）')
    toast('已填入 16 个扇区尾块的 Key A/B', 'ok')
  })

  // ---- export / import dump ----
  $('export-bin').addEventListener('click', () => {
    const out = Buffer.alloc(BLOCKS * 16)
    for (let b = 0; b < BLOCKS; b++) {
      let buf
      try { buf = parseBlock(b) } catch (e) { toast(e.message, 'err'); return }
      buf.copy(out, b * 16)
    }
    const blob = new Blob([out], { type: 'application/octet-stream' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `chameleon-slot${+slotSel.value + 1}-mf1k.dump`
    a.click()
    URL.revokeObjectURL(a.href)
    toast('已导出 .dump（1024 字节）', 'ok')
  })
  $('import-bin').addEventListener('click', () => $('import-file').click())
  $('import-file').addEventListener('change', (e) => {
    const f = e.target.files[0]; if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      const arr = new Uint8Array(reader.result)
      if (arr.length < BLOCKS * 16) { toast(`文件过短：${arr.length} 字节，需 1024`, 'err'); return }
      for (let b = 0; b < BLOCKS; b++) state[b] = Buffer.from(arr.slice(b * 16, b * 16 + 16))
      fillInputs()
      setState(`已导入 ${arr.length} 字节（未写入设备）`)
      toast('已导入 .dump，点「写入全部」生效', 'ok')
    }
    reader.readAsArrayBuffer(f)
    e.target.value = ''
  })

  function setState (s) { $('op-state').textContent = s }
}

// MIFARE 中介写卡 view — read a block from a real card (reader mode, known key)
// then write it into the emulated slot; plus whole-card clone (assumes one key
// for all sectors). Reader reads use cmdMf1ReadBlock (auto READER mode); emulator
// writes use cmdMf1WriteEmuBlockData (no mode switch needed).
import { ultra, run, toast, toBuf, hex, Buffer } from '../app.js'

export function initMfwrite () {
  const view = document.getElementById('view-mfwrite')
  const $ = id => view.querySelector('#' + id)

  function known (block, keyTypeSel, keySel) {
    const key = toBuf($(keySel).value)
    if (key.length !== 6) throw new Error('密钥需为 6 字节（12 hex）')
    return { block: +$(block).value, keyType: +$(keyTypeSel).value, key }
  }

  // ---- single block: read real card → write emu ----
  $('mw-read').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    let k
    try { k = known('mw-block', 'mw-keytype', 'mw-key') } catch (e) { toast(e.message, 'err'); return }
    $('mw-read-state').textContent = '读取中…'
    const data = await run('读取实体卡块', u => u.cmdMf1ReadBlock(k))
    if (!data) { $('mw-read-state').textContent = '失败'; return }
    $('mw-data').value = hex(data)
    $('mw-read-state').textContent = `已读取块 ${k.block}`
    toast('已读取实体卡块', 'ok')
  })

  $('mw-write').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    let data
    try { data = toBuf($('mw-data').value) } catch (e) { toast('数据 hex 非法', 'err'); return }
    if (data.length !== 16) { toast('数据需为 16 字节（32 hex）', 'warn'); return }
    const target = +$('mw-target').value
    $('mw-state').textContent = '写入中…'
    const ok = await run('写入模拟槽', u => u.cmdMf1WriteEmuBlockData({ blockIndex: target, data }))
    $('mw-state').textContent = ok ? `已写入模拟块 ${target}` : '失败'
    if (ok) toast('已写入模拟槽', 'ok')
  })

  // ---- whole-card clone ----
  $('mw-clone').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    let key
    try { key = toBuf($('mw-clone-key').value) } catch (e) { toast('克隆密钥 hex 非法', 'err'); return }
    if (key.length !== 6) { toast('克隆密钥需为 6 字节', 'warn'); return }
    const keyType = +$('mw-clone-keytype').value
    const prog = $('mw-progress')
    $('mw-clone-state').textContent = '克隆中…'
    for (let b = 0; b < 64; b++) {
      prog.value = b
      const k = { block: b, keyType, key }
      const data = await run('读取实体卡块', u => u.cmdMf1ReadBlock(k))
      if (!data) { $('mw-clone-state').textContent = `块 ${b} 读取失败，已停止`; toast(`克隆在块 ${b} 失败`, 'err'); return }
      const ok = await run('写入模拟槽', u => u.cmdMf1WriteEmuBlockData({ blockIndex: b, data }))
      if (!ok) { $('mw-clone-state').textContent = `块 ${b} 写入失败，已停止`; toast(`克隆在块 ${b} 失败`, 'err'); return }
    }
    prog.value = 64
    $('mw-clone-state').textContent = '克隆完成（64 块）'
    toast('整卡克隆完成', 'ok')
  })
}

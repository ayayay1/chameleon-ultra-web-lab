// MIFARE 数值块操作 view — Value Block Manipulate (cmdMf1VblockManipulate:
// inc/dec/restore), read current value, and a pure-JS value-block encoder.
import { ultra, run, toast, toBuf, hex, Buffer, Mf1KeyType, Mf1VblockOperator } from '../app.js'

export function initVblock () {
  const view = document.getElementById('view-vblock')
  const $ = id => view.querySelector('#' + id)

  function known (blockSel, keyTypeSel, keySel) {
    const key = toBuf($(keySel).value)
    if (key.length !== 6) throw new Error('密钥需为 6 字节（12 hex）')
    return { block: +$(blockSel).value, keyType: +$(keyTypeSel).value, key }
  }

  $('vb-run').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    let src, dst
    try { src = known('vb-src', 'vb-keytype', 'vb-key'); dst = known('vb-dst', 'vb-keytype', 'vb-key') }
    catch (e) { toast(e.message, 'err'); return }
    const operator = +$('vb-op').value
    const operand = +$('vb-operand').value
    if (!Number.isSafeInteger(operand) || operand < 0) { toast('操作数需为非负整数', 'warn'); return }
    $('vb-state').textContent = '执行中…'
    const ok = await run('数值块操作', u => u.cmdMf1VblockManipulate(src, operator, operand, dst))
    $('vb-state').textContent = ok ? '完成（结果写入目标块）' : '失败'
    if (ok) toast('数值块操作完成', 'ok')
  })

  $('vb-read').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    let dst
    try { dst = known('vb-dst', 'vb-keytype', 'vb-key') } catch (e) { toast(e.message, 'err'); return }
    const data = await run('读取目标块', u => u.cmdMf1ReadBlock(dst))
    if (!data) { $('vb-value').textContent = '值: —'; return }
    const v = data.readInt32LE(0)
    const addr = data[12]
    $('vb-value').textContent = `值: ${v} (0x${v.toString(16)}) · Addr: ${addr}`
    toast('已读取目标块', 'ok')
  })

  // ---- value block encoder helper (pure JS) ----
  $('vb-enc').addEventListener('click', () => {
    let val, addr
    try {
      val = Math.trunc(+$('vb-enc-val').value)
      addr = Math.trunc(+$('vb-enc-addr').value)
      if (!Number.isSafeInteger(val)) throw new Error('数值需为整数')
      if (addr < 0 || addr > 255) throw new Error('Addr 0–255')
    } catch (e) { toast(e.message, 'warn'); return }
    const b = Buffer.alloc(16)
    b.writeInt32LE(val, 0)
    b.writeInt32LE(~val, 4)
    b.writeInt32LE(val, 8)
    b[12] = addr; b[13] = ~addr & 0xFF; b[14] = addr; b[15] = ~addr & 0xFF
    $('vb-enc-out').textContent = hex(b)
    toast('已编码数值块', 'ok')
  })
}

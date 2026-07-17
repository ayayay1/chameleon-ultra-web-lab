// EM410x 低频 (125kHz) view — scan ID card, read/write emulated ID, and write
// an ID into a T55xx rewritable card.
import { ultra, run, toast, toBuf, hex, Buffer, TagType } from '../app.js'

export function initEm410x () {
  const view = document.getElementById('view-em410x')
  const $ = id => view.querySelector('#' + id)

  $('em-scan').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    $('em-state').textContent = '扫描中…'
    const r = await run('扫描 EM410x', u => u.cmdEm410xScan())
    if (!r) { $('em-state').textContent = '失败'; return }
    $('em-id').value = hex(r.id)
    $('em-state').textContent = `已扫描: ID ${hex(r.id)} (类型 ${TagType[r.tagType] ?? r.tagType})`
    toast('EM410x 扫描完成', 'ok')
  })

  $('em-get').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    const id = await run('读取模拟 ID', u => u.cmdEm410xGetEmuId())
    if (!id) return
    $('em-id').value = hex(id)
    $('em-state').textContent = `模拟 ID: ${hex(id)}`
    toast('已读取模拟 ID', 'ok')
  })
  $('em-set').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    let id
    try { id = toBuf($('em-id').value); if (id.length !== 5) throw new Error('EM410x ID 需为 5 字节（10 hex）') }
    catch (e) { toast(e.message, 'err'); return }
    const ok = await run('写入模拟 ID', u => u.cmdEm410xSetEmuId(id))
    if (ok) toast('已写入模拟 ID（需激活槽标签类型为 EM410X）', 'ok')
  })

  $('em-t55-write').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    let id, newKey, oldKeys
    try {
      id = toBuf($('em-t55-id').value); if (id.length !== 5) throw new Error('目标 ID 需为 5 字节（10 hex）')
      newKey = toBuf($('em-t55-newkey').value); if (newKey.length !== 4) throw new Error('新口令需为 4 字节（8 hex）')
      oldKeys = $('em-t55-oldkey').value.split(/[\s,]+/).map(s => s.trim()).filter(Boolean).map(k => {
        const b = toBuf(k); if (b.length !== 4) throw new Error(`旧口令 "${k}" 需为 4 字节（8 hex）`); return b
      })
    } catch (e) { toast(e.message, 'err'); return }
    if (!oldKeys.length) { toast('请至少填一个旧口令', 'warn'); return }
    $('em-state').textContent = '写入 T55xx 中…'
    const ok = await run('写入 T55xx', u => u.cmdEm410xWriteToT55xx(id, newKey, oldKeys))
    $('em-state').textContent = ok ? '已写入 T55xx' : '失败'
    if (ok) toast('已写入 T55xx 卡', 'ok')
  })
}

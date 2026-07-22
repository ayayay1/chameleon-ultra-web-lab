// 统一读卡页：扫描 HF14A / EM410x / HID Prox，结果可保存到收藏库。
import { onConnected, ultra, run, toast, hex } from '../app.js'
import { saveToLibrary } from './library.js'

export function initRead () {
  const view = document.getElementById('view-read')
  const $ = id => view.querySelector('#' + id)

  $('read-hf-btn').addEventListener('click', async () => {
    await run('HF14A 扫描', async (u) => {
      const r = await u.cmdHf14aScan()
      $('read-hf').textContent = r.length
        ? r.map(t => `UID:${hex(t.uid)} ATQA:${hex(t.atqa)} SAK:${t.sak} ATS:${t.ats ? hex(t.ats) : '-'}`).join('\n')
        : '未检测到卡片'
      $('read-hf').dataset.payload = JSON.stringify(r)
    })
  })

  $('read-em-btn').addEventListener('click', async () => {
    await run('EM410x 扫描', async (u) => {
      const r = await u.cmdEm410xScan()
      const id = hex(r.id)
      $('read-em').textContent = `EM410x ID: ${id}（${r.id.length} 字节）`
      $('read-em').dataset.emid = id
    })
  })

  $('read-hid-btn').addEventListener('click', async () => {
    await run('HID Prox 扫描', async (u) => {
      const r = await u.cmdHidProxScan()
      $('read-hid').textContent = `格式:${r.format} FC:${r.fc} CN:${r.cn} IL:${r.il} OEM:${r.oem}`
      $('read-hid').dataset.hid = JSON.stringify(r)
    })
  })

  $('read-save-hf').addEventListener('click', async () => {
    const raw = $('read-hf').dataset.payload
    if (!raw) { toast('请先扫描 HF14A', 'warn'); return }
    const arr = JSON.parse(raw)
    const name = prompt('收藏名称', 'HF14A ' + hex(arr[0].uid)) || 'HF14A'
    await saveToLibrary({ name, type: 'HF14A', data: raw, snippet: arr.map(t => hex(t.uid)).join(',') })
    toast('已保存到收藏', 'ok')
  })

  $('read-save-em').addEventListener('click', async () => {
    const id = $('read-em').dataset.emid
    if (!id) { toast('请先扫描 EM410x', 'warn'); return }
    const name = prompt('收藏名称', 'EM410x ' + id) || ('EM410x ' + id)
    await saveToLibrary({ name, type: 'EM410X', data: id, snippet: id })
    toast('已保存到收藏', 'ok')
  })

  $('read-save-hid').addEventListener('click', async () => {
    const raw = $('read-hid').dataset.hid
    if (!raw) { toast('请先扫描 HID', 'warn'); return }
    const r = JSON.parse(raw)
    const name = prompt('收藏名称', `HID ${r.fc}-${r.cn}`) || `HID ${r.fc}-${r.cn}`
    await saveToLibrary({ name, type: 'HID', data: r, snippet: `${r.fc}-${r.cn}` })
    toast('已保存到收藏', 'ok')
  })

  onConnected(() => {})
}

// 固件更新 (DFU) view — enter DFU, query protocol/versions, and upload a
// nRF DFU package (init .dat + firmware .bin) using the SDK's dfuUpdateImage,
// which handles object creation, chunked transfer, CRC checks and progress.
import { ultra, run, toast, DfuFwId, Buffer } from '../app.js'

export function initFirmware () {
  const view = document.getElementById('view-firmware')
  const $ = id => view.querySelector('#' + id)

  function setState (s) { $('fw-state').textContent = s }
  const onProgress = (p) => {
    if (p?.func === 'dfuUpdateObject' && p.size) {
      $('fw-progress').value = Math.round((p.offset / p.size) * 100)
      setState(`上传中… ${p.offset}/${p.size} 字节 (${Math.round(p.offset / p.size * 100)}%)`)
    }
  }

  $('fw-enter').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    const ok = await run('进入 DFU', u => u.cmdDfuEnter())
    if (ok) { setState('已进入 DFU 模式，可上传固件'); toast('已进入 DFU', 'ok') }
  })
  $('fw-proto').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    const v = await run('查询协议', u => u.cmdDfuGetProtocol())
    if (v === null) return
    $('fw-proto-badge').textContent = `协议: ${v}`
    toast('已查询 DFU 协议', 'ok')
  })
  $('fw-hwver').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    const v = await run('硬件版本', u => u.cmdDfuGetHardwareVersion())
    if (v === null) return
    setState(`硬件版本: ${JSON.stringify(v)}`)
    toast('已查询硬件版本', 'ok')
  })
  $('fw-fwver').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    const v = await run('固件版本', u => u.cmdDfuGetFirmwareVersion(DfuFwId.APPLICATION))
    if (v === null) return
    setState(`固件版本: ${JSON.stringify(v)}`)
    toast('已查询固件版本', 'ok')
  })
  $('fw-abort').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    const ok = await run('中止 DFU', u => u.cmdDfuAbort())
    if (ok) { setState('已中止 DFU'); toast('已中止', 'ok') }
  })

  $('fw-upload').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    const initFile = $('fw-init').files[0]
    const binFile = $('fw-bin').files[0]
    if (!initFile || !binFile) { toast('请同时选择 init 包 (.dat) 与固件 (.bin)', 'warn'); return }
    const header = Buffer.from(new Uint8Array(await initFile.arrayBuffer()))
    const body = Buffer.from(new Uint8Array(await binFile.arrayBuffer()))
    if (!await run('进入 DFU', u => u.cmdDfuEnter())) return
    ultra.emitter.on('progress', onProgress)
    setState(`上传中… 0/${body.length} 字节 (0%)`)
    $('fw-progress').value = 0
    try {
      await ultra.dfuUpdateImage({ header, body })
      setState('上传完成，设备重启中…')
      toast('固件上传完成，设备正在重启', 'ok')
    } catch (e) {
      setState(`上传失败: ${String(e?.message ?? e)}`)
      toast('固件上传失败', 'err')
    } finally {
      ultra.emitter.removeListener('progress', onProgress)
    }
  })
}

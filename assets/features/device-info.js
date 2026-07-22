// 设备信息增强：首页卡片展示型号 / 固件版本 / 芯片 ID / 支持命令数。
import { onConnected, ultra, toast, DeviceModel } from '../app.js'

export function initDeviceInfo () {
  const body = document.getElementById('devinfo-body')
  const btn = document.getElementById('devinfo-refresh')
  if (!body || !btn) return

  async function refresh () {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    // 顺序读取：BLE 链路下并行命令易丢帧导致超时。
    const safe = async (fn, dflt) => { try { return await fn() } catch { return dflt } }
    const chipId = await safe(() => ultra.cmdGetDeviceChipId(), null)
    const model = await safe(() => ultra.cmdGetDeviceModel(), null)
    const app = await safe(() => ultra.cmdGetAppVersion(), '?')
    const git = await safe(() => ultra.cmdGetGitVersion(), '')
    const cmds = await safe(() => ultra.cmdGetSupportedCmds(), null)
    const modelName = model === DeviceModel.ULTRA ? 'Chameleon Ultra'
      : model === DeviceModel.LITE ? 'Chameleon Lite'
      : (model == null ? '?' : String(model))
    // 版本号优先用完整 git 描述（如 v2.2.0-DAHAOREN），缺失时退回 app 版本。
    const ver = (git && git !== '?' && git.trim()) ? git.trim() : `v${app}`
    body.innerHTML = `
      <div>型号: <b>${modelName}</b></div>
      <div>固件: ${ver}</div>
      <div>芯片 ID: <span class="mono">${chipId ?? '—'}</span></div>
      <div>支持命令数: <b>${cmds ? cmds.size : '—'}</b></div>`
  }

  btn.addEventListener('click', refresh)
  onConnected(refresh)
}

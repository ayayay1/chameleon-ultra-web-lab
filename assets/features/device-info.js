// 设备信息增强：首页卡片展示型号 / 固件版本 / 芯片 ID / 支持命令数。
import { onConnected, ultra, run, toast, DeviceModel } from '../app.js'

export function initDeviceInfo () {
  const body = document.getElementById('devinfo-body')
  const btn = document.getElementById('devinfo-refresh')
  if (!body || !btn) return

  async function refresh () {
    await run('读取设备信息', async (u) => {
      const [chipId, model, app, git, cmds] = await Promise.all([
        u.cmdGetDeviceChipId().catch(() => null),
        u.cmdGetDeviceModel().catch(() => null),
        u.cmdGetAppVersion().catch(() => '?'),
        u.cmdGetGitVersion().catch(() => '?'),
        u.cmdGetSupportedCmds().catch(() => null),
      ])
      const modelName = model === DeviceModel.ULTRA ? 'Chameleon Ultra'
        : model === DeviceModel.LITE ? 'Chameleon Lite'
        : (model == null ? '?' : String(model))
      body.innerHTML = `
        <div>型号: <b>${modelName}</b></div>
        <div>固件: v${app} （git ${git}）</div>
        <div>芯片 ID: <span class="mono">${chipId ?? '—'}</span></div>
        <div>支持命令数: <b>${cmds ? cmds.size : '—'}</b></div>`
    })
  }

  btn.addEventListener('click', refresh)
  onConnected(refresh)
}

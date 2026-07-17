// Auto-Poll config view — wired once at SPA load. Shares the single
// ChameleonUltra connection from ../app.js, so it stays connected when
// switching tabs.
import { onConnected, ultra, run, toast } from '../app.js'

export function initAutopoll () {
  const view = document.getElementById('view-autopoll')
  const $ = id => view.querySelector('#' + id)

  function render (cfg) {
    $('smart').checked = !!(cfg.enable & 1)
    $('timer').checked = !!(cfg.enable & 2)
    $('interval').value = cfg.intervalMs
    $('enable-badge').textContent = `enable: 0x${cfg.enable.toString(16).padStart(2, '0')} (${cfg.enable})`
    $('interval-badge').textContent = `interval: ${cfg.intervalMs} ms`
    $('lastslot-badge').textContent = `上次认证槽: ${cfg.lastAuthSlot}`
  }

  async function readCfg () {
    const cfg = await run('读取 Auto-Poll 配置', (u) => u.cmdGetAutoPollConfig())
    if (cfg) { render(cfg); toast('已读取配置', 'ok') }
  }
  onConnected(readCfg)

  async function saveCfg () {
    const enable = ($('smart').checked ? 1 : 0) | ($('timer').checked ? 2 : 0)
    const intervalMs = Math.max(50, Math.min(65535, +$('interval').value || 350))
    const ok = await run('保存 Auto-Poll 配置', (u) =>
      u.cmdSetAutoPollConfig({ enable, intervalMs }))
    if (ok) toast(`已保存：enable=0x${enable.toString(16)} interval=${intervalMs}ms`, 'ok')
  }

  $('read').addEventListener('click', readCfg)
  $('save').addEventListener('click', saveCfg)

  view.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const p = +btn.dataset.preset
      $('smart').checked = !!(p & 1)
      $('timer').checked = !!(p & 2)
      if (p) $('interval').value = $('interval').value || 350
      await saveCfg()
    })
  })
}

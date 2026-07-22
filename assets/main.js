// SPA entry point. Owns the single shared ChameleonUltra connection (via
// app.js) and switches between feature views without reloading the page, so
// the device connection survives tab navigation.
import { setupCommonUI, connect, setGoView } from './app.js'
import { initDeviceSettings } from './features/device-settings.js'
import { initSlots } from './features/slots.js'
import { initMifare1k } from './features/mifare1k.js'
import { initAutopoll } from './features/autopoll.js'
import { initMfkey } from './features/mfkey.js'
import { initEmu } from './features/emu.js'
import { initMfwrite } from './features/mfwrite.js'
import { initVblock } from './features/vblock.js'
import { initAccess } from './features/access.js'
import { initHf14a } from './features/hf14a.js'
import { initEm410x } from './features/em410x.js'
import { initFirmware } from './features/firmware.js'
import { initDeviceInfo } from './features/device-info.js'
import { initMfu } from './features/mfu.js'
import { initHid } from './features/hid.js'
import { initRead } from './features/read.js'
import { initLibrary } from './features/library.js'
import { initAppSettings } from './features/appset.js'

const VIEWS = ['home', 'settings', 'slots', 'mifare', 'autopoll',
  'mfkey', 'emu', 'mfwrite', 'vblock', 'access', 'hf14a', 'em410x', 'firmware',
  'mfu', 'hid', 'read', 'library', 'appset']

function setupTabs () {
  const links = document.querySelectorAll('header.topbar nav a[data-view]')

  function show (name) {
    if (!VIEWS.includes(name)) name = 'home'
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === `view-${name}`))
    links.forEach(a => a.classList.toggle('active', a.dataset.view === name))
    if (location.hash !== `#view-${name}`) history.replaceState(null, '', `#view-${name}`)
  }

  links.forEach(a => a.addEventListener('click', (e) => {
    e.preventDefault()
    show(a.dataset.view)
  }))

  // Home feature cards jump to a view.
  document.querySelectorAll('[data-goto]').forEach(c => c.addEventListener('click', (e) => {
    e.preventDefault()
    show(c.dataset.goto)
  }))

  // Home "connect" button.
  document.getElementById('big-connect')?.addEventListener('click', () => {
    connect().catch(e => alert(e))
  })

  const start = (location.hash || '').replace('#view-', '') || 'home'
  show(VIEWS.includes(start) ? start : 'home')
  setGoView(show)
}

// ---- 全局错误横幅：把任何未捕获的报错显示在页面底部，方便排查 ----
function showErrorBanner (msg) {
  let b = document.getElementById('error-banner')
  if (!b) {
    b = document.createElement('div')
    b.id = 'error-banner'
    b.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#b00020;color:#fff;font:12px/1.5 ui-monospace,Menlo,Consolas,monospace;padding:10px 14px;white-space:pre-wrap;max-height:45vh;overflow:auto;box-shadow:0 -2px 8px rgba(0,0,0,.4)'
    document.body.appendChild(b)
  }
  b.textContent += msg + '\n'
}
window.addEventListener('error', (e) => {
  showErrorBanner('[error] ' + (e.message || e.error) + (e.filename ? ` @ ${e.filename}:${e.lineno}:${e.colno}` : ''))
})
window.addEventListener('unhandledrejection', (e) => {
  const r = e.reason
  showErrorBanner('[未处理的 Promise] ' + (r && (r.stack || r.message) || String(r)))
})
// 供各 feature 模块在 catch 中复用同一错误横幅
window.showErrorBanner = showErrorBanner

// 逐个初始化各视图；任一视图初始化抛错都不应阻断其余视图。
const INITS = [
  initDeviceSettings, initSlots, initMifare1k, initAutopoll, initMfkey,
  initEmu, initMfwrite, initVblock, initAccess, initHf14a, initEm410x,
  initFirmware, initDeviceInfo, initMfu, initHid, initRead, initLibrary, initAppSettings,
]
for (const fn of INITS) {
  try { fn() } catch (e) {
    showErrorBanner(`[init ${fn.name}] 失败: ${e && (e.stack || e.message) || e}`)
  }
}
setupTabs()

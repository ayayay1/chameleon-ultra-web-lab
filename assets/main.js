// SPA entry point. Owns the single shared ChameleonUltra connection (via
// app.js) and switches between feature views without reloading the page, so
// the device connection survives tab navigation.
import { setupCommonUI, connect } from './app.js'
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

const VIEWS = ['home', 'settings', 'slots', 'mifare', 'autopoll',
  'mfkey', 'emu', 'mfwrite', 'vblock', 'access', 'hf14a', 'em410x', 'firmware']

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
}

setupCommonUI()
initDeviceSettings()
initSlots()
initMifare1k()
initAutopoll()
initMfkey()
initEmu()
initMfwrite()
initVblock()
initAccess()
initHf14a()
initEm410x()
initFirmware()
setupTabs()

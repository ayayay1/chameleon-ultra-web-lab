// Shared connection layer + UI helpers for the local Chameleon Ultra web lab.
// Every page imports this module; it owns a single ChameleonUltra instance and
// can connect over Web Serial (USB) OR Web Bluetooth (BLE), matching the stock
// lab.chameleon-ultra.cn behaviour.
import {
  ChameleonUltra, WebserialAdapter, WebbleAdapter, Cmd, Slot, FreqType, DeviceMode,
  AnimationMode, ButtonType, ButtonAction, Mf1KeyType, Mf1VblockOperator, Mf1EmuWriteMode, MfuEmuWriteMode,
  Mf1PrngType, Hf14aBccMode, Hf14aCascadeLevelMode, Hf14aRatsMode, TagType, Buffer,
  HidProxFormat, DeviceModel,
  DfuFwId, DfuObjType,
} from '../vendor/chameleon-ultra.mjs'

const serialAdapter = new WebserialAdapter()
const bleAdapter = new WebbleAdapter()

export const ultra = new ChameleonUltra()
// Install both adapters up-front so their connect/disconnect hooks are registered.
// The *active* adapter (driven by the dropdown) is the one that actually handles
// ultra.connect(); the other hook simply passes through via next().
ultra.use(serialAdapter)
ultra.use(bleAdapter)

export {
  Cmd, Slot, FreqType, DeviceMode, AnimationMode,
  ButtonType, ButtonAction, Mf1KeyType, Mf1VblockOperator, Mf1EmuWriteMode, MfuEmuWriteMode,
  Mf1PrngType, Hf14aBccMode, Hf14aCascadeLevelMode, Hf14aRatsMode, TagType, Buffer,
  HidProxFormat, DeviceModel,
  DfuFwId, DfuObjType,
  serialAdapter, bleAdapter,
}

// ---- connection mode (usb | ble) ----
let selectedMode = 'usb' // default; overridden by dropdown
let activeMode = 'ble'    // last adapter pushed to $adapter (start = ble, will switch on first connect)

function getMode () { return selectedMode }
async function applyMode () {
  const mode = selectedMode
  if (mode === activeMode) return
  await ultra.use(mode === 'ble' ? bleAdapter : serialAdapter)
  activeMode = mode
}

// ---- connection state + listeners ----
const connectedCbs = []
const disconnectedCbs = []
export function onConnected (cb) { connectedCbs.push(cb) }
export function onDisconnected (cb) { disconnectedCbs.push(cb) }

export function isConnected () { return ultra.isConnected() }

export async function connect () {
  if (ultra.isConnected()) return
  applyMode() // make sure the chosen adapter is active
  try {
    await ultra.connect() // opens the browser picker (USB serial OR BLE device)
  } catch (e) {
    const name = e?.name
    const msg = e?.message ?? String(e)
    if (name === 'NotFoundError') throw new Error('已取消选择设备')
    if (/not supported/i.test(msg)) {
      throw new Error(selectedMode === 'ble'
        ? '当前浏览器不支持 Web Bluetooth，请改用 Chrome / Edge，或切换为 USB 连接'
        : '当前浏览器不支持 Web Serial，请改用 Chrome / Edge')
    }
    throw e
  }
  await refreshStatus()
  for (const cb of connectedCbs) { try { await cb() } catch (e) { toast(String(e), 'err') } }
}

export async function disconnect () {
  try { await ultra.disconnect() } catch { /* ignore */ }
  setStatus(false)
  for (const cb of disconnectedCbs) { try { cb() } catch {} }
}

ultra.emitter.on('disconnected', () => {
  setStatus(false)
  for (const cb of disconnectedCbs) { try { cb() } catch {} }
})
ultra.emitter.on('error', (e) => { toast(String(e?.message ?? e), 'err') })

// ---- status bar ----
let deviceInfo = {}
export function getDeviceInfo () { return deviceInfo }

async function refreshStatus () {
  const ok = ultra.isConnected()
  setStatus(ok)
  if (!ok) { deviceInfo = {}; updateInfoEl(); return }
  try {
    const [app, git, model, bat] = await Promise.all([
      ultra.cmdGetAppVersion().catch(() => '?'),
      ultra.cmdGetGitVersion().catch(() => '?'),
      ultra.cmdGetDeviceModel().catch(() => null),
      ultra.cmdGetBatteryInfo().catch(() => null),
    ])
    deviceInfo = { app, git, model, bat }
  } catch (e) { toast(String(e), 'err') }
  updateInfoEl()
}

function updateInfoEl () {
  const el = document.getElementById('device-info')
  if (!el) return
  if (!ultra.isConnected()) { el.textContent = '未连接'; return }
  const { app, git, model, bat } = deviceInfo
  const modelName = model === 0 ? 'Ultra' : model === 1 ? 'Lite' : String(model)
  const batStr = bat ? `${bat.level}%` : ''
  el.textContent = `v${app} · ${git} · ${modelName} · ${batStr}`
}

function setStatus (on) {
  const dot = document.getElementById('status-dot')
  const btn = document.getElementById('connect-btn')
  if (dot) { dot.classList.toggle('on', !!on) }
  if (btn) { btn.textContent = on ? '断开连接' : '连接设备' }
}

// Wire the shared header controls present in every page.
export function setupCommonUI () {
  const btn = document.getElementById('connect-btn')
  if (btn) {
    btn.addEventListener('click', async () => {
      try {
        if (ultra.isConnected()) await disconnect()
        else await connect()
      } catch (e) { toast(String(e?.message ?? e), 'err') }
    })
  }

  // Inject a connection-method selector (USB / Bluetooth) into the header.
  injectModeSelector()

  // highlight active nav link
  const here = location.pathname.split('/').pop() || 'index.html'
  document.querySelectorAll('header.topbar nav a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('active')
  })
  setStatus(ultra.isConnected())
}

function injectModeSelector () {
  const conn = document.querySelector('header.topbar .conn')
  if (!conn) return
  if (document.getElementById('conn-mode')) return
  const sel = document.createElement('select')
  sel.id = 'conn-mode'
  sel.title = '连接方式'
  const bleSupported = typeof navigator !== 'undefined' && !!navigator.bluetooth
  sel.innerHTML = `
    <option value="usb">USB 串口</option>
    <option value="ble"${bleSupported ? '' : ' disabled'}>蓝牙 BLE${bleSupported ? '' : '（当前浏览器不支持）'}</option>`
  sel.value = selectedMode
  if (!bleSupported) selectedMode = 'usb'
  sel.addEventListener('change', () => {
    selectedMode = sel.value
    if (ultra.isConnected()) {
      toast('已切换连接方式，将先断开当前连接', 'warn')
      disconnect().catch(() => {})
    }
  })
  conn.insertBefore(sel, conn.firstChild)
}

// ---- toast ----
export function toast (msg, type = 'ok') {
  let wrap = document.querySelector('.toast-wrap')
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap) }
  const t = document.createElement('div')
  t.className = `toast ${type}`
  t.textContent = msg
  wrap.appendChild(t)
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300) }, 3500)
}

// ---- buffer helpers ----
export function hex (buf) { return buf.toString('hex').toUpperCase() }
export function toBuf (str) {
  const s = (str || '').replace(/\s+/g, '')
  if (s.length % 2) throw new Error('Hex 长度必须为偶数')
  if (!/^[0-9a-fA-F]*$/.test(s)) throw new Error('Hex 含非法字符')
  return Buffer.from(s, 'hex')
}
export function cloneBuf (buf) { return Buffer.from(buf) }

// ---- cross-module view navigation (registered by main.js setupTabs) ----
let _goView = null
export function setGoView (fn) { _goView = fn }
export function goView (name) { if (_goView) _goView(name) }

// ---- generic command runner with toast ----
export async function run (label, fn) {
  if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return null }
  try {
    const r = await fn(ultra)
    // Normalize void results: success of a no-return command -> true,
    // while still preserving real values (Buffer/object/boolean false).
    return r === undefined ? true : r
  } catch (e) {
    toast(`${label} 失败: ${String(e?.message ?? e)}`, 'err')
    return null
  }
}

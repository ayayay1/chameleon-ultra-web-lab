// Device settings view — wired once at SPA load. Shares the single
// ChameleonUltra connection from ../app.js, so it stays connected when
// switching tabs.
import {
  onConnected, ultra, run, toast,
  DeviceMode, AnimationMode, ButtonType, ButtonAction,
} from '../app.js'

// 中文标签：SDK 枚举默认是英文 key，这里映射成中文
const DEVICE_MODE_LABELS = { 0: '卡片模拟 (TAG)', 1: '读卡器 (READER)' }
const ANIM_MODE_LABELS = { 0: '完整动画', 1: '简短动画', 2: '关闭', 3: '对称动画' }
const BTN_ACTION_LABELS = {
  0: '无功能',
  1: '切换下一卡槽',
  2: '切换上一卡槽',
  3: '克隆 IC/UID',
  4: '显示电量',
}
// 长按下拉里的「自动轮询」选项：固件按钮动作枚举无此值（仅 0–4），
// 故用哨兵值 99 表示，选中时改走 Auto-Poll 配置 bit1（真实命令 1042）。
const AUTO_POLL = 99

export function initDeviceSettings () {
  const view = document.getElementById('view-settings')
  const $ = id => view.querySelector('#' + id)
  const u = ultra

  const opt = (v, t) => `<option value="${v}">${t}</option>`
  const fill = (sel, obj, labels, sel0) => {
    sel.innerHTML = Object.entries(obj)
      .filter(([, v]) => typeof v === 'number')
      .map(([k, v]) => opt(v, labels?.[v] ?? k)).join('')
    if (sel0 != null) sel.value = String(sel0)
  }
  fill($('device-mode'), DeviceMode, DEVICE_MODE_LABELS)
  fill($('anim-mode'), AnimationMode, ANIM_MODE_LABELS)
  fill($('btnA-short'), ButtonAction, BTN_ACTION_LABELS)
  fill($('btnB-short'), ButtonAction, BTN_ACTION_LABELS)
  // 长按下拉追加「自动轮询」选项
  const fillLong = (sel) => {
    fill(sel, ButtonAction, BTN_ACTION_LABELS)
    sel.insertAdjacentHTML('beforeend', opt(AUTO_POLL, '自动轮询'))
  }
  fillLong($('btnA-long'))
  fillLong($('btnB-long'))

  // 单条命令容错：失败返回 dflt，绝不抛出（避免一条超时拖垮整批读取）。
  const safe = async (fn, dflt) => { try { return await fn() } catch { return dflt } }

  async function refreshAll () {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    const st = $('settings-state')
    if (st) st.textContent = '读取中…'
    // 顺序读取：BLE 链路下并行命令易丢帧导致整批 5000ms 超时。
    const mode = await safe(() => u.cmdGetDeviceMode(), null)
    const anim = await safe(() => u.cmdGetAnimationMode(), null)
    const bA = await safe(() => u.cmdGetButtonPressAction(ButtonType.BUTTON_A), null)
    const bAl = await safe(() => u.cmdGetButtonLongPressAction(ButtonType.BUTTON_A), null)
    const bB = await safe(() => u.cmdGetButtonPressAction(ButtonType.BUTTON_B), null)
    const bBl = await safe(() => u.cmdGetButtonLongPressAction(ButtonType.BUTTON_B), null)
    const bat = await safe(() => u.cmdGetBatteryInfo(), null)
    const bleMode = await safe(() => u.cmdBleGetPairingMode(), null)
    const bleKey = await safe(() => u.cmdBleGetPairingKey(), '')
    const ap = await safe(() => u.cmdGetAutoPollConfig(), null)

    if (mode != null) $('device-mode').value = String(mode)
    if (anim != null) $('anim-mode').value = String(anim)
    if (bA != null) $('btnA-short').value = String(bA)
    if (bB != null) $('btnB-short').value = String(bB)
    // 自动轮询（1042 bit1）是设备级开关：开启时长按 A/B 下拉都显示「自动轮询」
    const apOn = ap && !!(ap.enable & 2)
    if (apOn) {
      $('btnA-long').value = String(AUTO_POLL)
      $('btnB-long').value = String(AUTO_POLL)
    } else {
      if (bAl != null) $('btnA-long').value = String(bAl)
      if (bBl != null) $('btnB-long').value = String(bBl)
    }
    $('battery').textContent = (bat && typeof bat.level === 'number')
      ? `${bat.level}% · ${(bat.voltage / 1000).toFixed(2)}V (${bat.voltage} mV)`
      : '读取失败'
    if (bleMode != null) $('ble-mode').checked = !!bleMode
    $('ble-key').value = bleKey ?? ''

    const core = [mode, anim, bA, bAl, bB, bBl, bat, bleMode, ap]
    const fails = core.filter(v => v == null).length
    const read = core.length - fails
    if (st) st.textContent = fails === 0 ? `已读取 ${read}/${core.length} 项`
      : (fails === core.length ? '读取全部失败，请检查连接后重连' : `已读取 ${read}/${core.length} 项（部分失败）`)
    if (fails === core.length) toast('设备设置读取全部失败，请检查连接或重连', 'err')
  }
  onConnected(refreshAll)

  // 长按下拉：选「自动轮询」翻转 1042 bit1；选普通动作则写入该按键动作并清 bit1。
  // 末尾的 refreshAll() 会重读设备，自动把两个下拉同步成真实状态。
  async function setLongPress (btn, selId) {
    const val = +$(selId).value
    await run('设置按键长按', async () => {
      const cur = await u.cmdGetAutoPollConfig()
      const enable = (cur.enable & 1) | (val === AUTO_POLL ? 2 : 0) // 保留 bit0 智能选槽
      await u.cmdSetAutoPollConfig({ enable, intervalMs: cur.intervalMs })
      if (val !== AUTO_POLL) await u.cmdSetButtonLongPressAction(btn, val)
    })
  }

  view.addEventListener('click', async (e) => {
    const act = e.target?.dataset?.act
    if (!act) return
    switch (act) {
      case 'read': await refreshAll(); break
      case 'set-mode': await run('设置模式', () => u.cmdChangeDeviceMode(+$('device-mode').value)); break
      case 'set-anim': await run('设置动画', () => u.cmdSetAnimationMode(+$('anim-mode').value)); break
      case 'set-btnA-short': await run('按键A短按', () => u.cmdSetButtonPressAction(ButtonType.BUTTON_A, +$('btnA-short').value)); break
      case 'set-btnA-long': await setLongPress(ButtonType.BUTTON_A, 'btnA-long'); break
      case 'set-btnB-short': await run('按键B短按', () => u.cmdSetButtonPressAction(ButtonType.BUTTON_B, +$('btnB-short').value)); break
      case 'set-btnB-long': await setLongPress(ButtonType.BUTTON_B, 'btnB-long'); break
      case 'set-ble-key': await run('设置BLE密钥', () => u.cmdBleSetPairingKey($('ble-key').value)); break
      case 'set-ble-mode': await run('设置BLE模式', () => u.cmdBleSetPairingMode($('ble-mode').checked)); break
      case 'del-bonds': await run('删除配对', () => u.cmdBleDeleteAllBonds()); break
      case 'save': if (await run('保存', () => u.cmdSaveSettings())) toast('已保存', 'ok'); break
      case 'reset': if (await run('恢复出厂', () => u.cmdResetSettings())) toast('已恢复出厂设置', 'ok'); break
      case 'wipe':
        if (!confirm('确认清空 FDS？所有卡槽卡片数据将被删除，且不可恢复！')) break
        if (await run('清空FDS', () => u.cmdWipeFds())) toast('FDS 已清空', 'ok')
        break
    }
    if (ultra.isConnected()) refreshAll()
  })
}

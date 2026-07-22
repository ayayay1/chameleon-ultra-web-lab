// HID Prox (LF 125kHz) 模块：扫描、模拟、写入 T55xx。
import { onConnected, ultra, run, toast, toBuf, hex, Slot, TagType, HidProxFormat } from '../app.js'

export function initHid () {
  const view = document.getElementById('view-hid')
  const $ = id => view.querySelector('#' + id)
  const u = ultra

  $('hid-scan').addEventListener('click', async () => {
    await run('HID Prox 扫描', async () => {
      const r = await u.cmdHidProxScan()
      $('hid-scan-out').textContent = `格式:${HidProxFormat[r.format] ?? r.format} FC:${r.fc} CN:${r.cn} IL:${r.il} OEM:${r.oem}`
      $('hid-format').value = String(r.format)
      $('hid-fc').value = r.fc
      $('hid-cn').value = r.cn
      $('hid-il').value = r.il
      $('hid-oem').value = r.oem
    })
  })

  $('hid-get-emu').addEventListener('click', async () => {
    await run('读取 HID 模拟', async () => {
      const r = await u.cmdHidProxGetEmu()
      $('hid-format').value = String(r.format)
      $('hid-fc').value = r.fc
      $('hid-cn').value = r.cn
      $('hid-il').value = r.il
      $('hid-oem').value = r.oem
      $('hid-emu-out').textContent = `格式:${HidProxFormat[r.format] ?? r.format} FC:${r.fc} CN:${r.cn}`
    })
  })

  $('hid-set-emu').addEventListener('click', async () => {
    const tag = {
      format: +$('hid-format').value,
      fc: +$('hid-fc').value,
      cn: +$('hid-cn').value,
      il: +$('hid-il').value,
      oem: +$('hid-oem').value,
    }
    await run('写入 HID 模拟', async () => {
      const active = await u.cmdSlotGetActive()
      await u.cmdSlotChangeTagType(active, TagType.HIDProx)
      await u.cmdSlotSetActive(active)
      await u.cmdHidProxSetEmu(tag)
      return true
    })
    toast('已写入 HID 模拟', 'ok')
  })

  $('hid-set-tag').addEventListener('click', async () => {
    await run('设置卡槽为 HIDProx', async () => {
      const active = await u.cmdSlotGetActive()
      await u.cmdSlotChangeTagType(active, TagType.HIDProx)
      await u.cmdSlotSetActive(active)
      return true
    })
    toast('已设为 HIDProx', 'ok')
  })

  $('hid-write-t55').addEventListener('click', async () => {
    const tag = {
      format: +$('hid-t55-format').value,
      fc: +$('hid-t55-fc').value,
      cn: +$('hid-t55-cn').value,
      il: +$('hid-t55-il').value,
      oem: +$('hid-t55-oem').value,
    }
    let newKey, oldKeys
    try {
      newKey = toBuf($('hid-t55-newkey').value)
      if (newKey.length !== 4) throw new Error('新口令需 4 字节（8 hex）')
      oldKeys = $('hid-t55-oldkey').value.split(/[\s,]+/).map(s => s.trim()).filter(Boolean).map(s => {
        const b = toBuf(s); if (b.length !== 4) throw new Error(`旧口令 ${s} 需 4 字节`); return b
      })
      if (!oldKeys.length) throw new Error('至少填一个旧口令')
    } catch (e) { toast(e.message, 'err'); return }
    await run('写入 T55xx', async () => { await u.cmdHidProxWriteToT55xx(tag, newKey, oldKeys); return true })
    toast('已写入 T55xx', 'ok')
  })

  onConnected(() => {})
}

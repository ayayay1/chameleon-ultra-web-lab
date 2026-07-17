// Slots view — wired once at SPA load. Shares the single ChameleonUltra
// connection from ../app.js, so it stays connected when switching tabs.
import { onConnected, ultra, run, toast, FreqType, Slot } from '../app.js'

export function initSlots () {
  const view = document.getElementById('view-slots')
  const tbody = view.querySelector('#slot-table tbody')
  const $ = id => view.querySelector('#' + id)
  let activeSlot = 0

  function buildRows () {
    let html = ''
    for (let i = 0; i < 8; i++) {
      html += `<tr data-slot="${i}">
        <td><b>${i + 1}</b></td>
        <td><input type="radio" name="active" data-act="active" ${i === activeSlot ? 'checked' : ''}></td>
        <td><input type="checkbox" data-act="hf"></td>
        <td><input type="checkbox" data-act="lf"></td>
        <td><input type="text" data-act="hf-nick" maxlength="32" placeholder="—" style="min-width:140px"></td>
        <td><input type="text" data-act="lf-nick" maxlength="32" placeholder="—" style="min-width:140px"></td>
        <td><button class="small ghost" data-act="save-row">保存本槽</button></td>
      </tr>`
    }
    tbody.innerHTML = html
  }

  async function refreshAll () {
    const r = await run('读取卡槽', async (u) => {
      const [active, enables, names] = await Promise.all([
        u.cmdSlotGetActive(), u.cmdSlotGetIsEnable(), u.cmdSlotGetFreqNames(),
      ])
      return { active, enables, names }
    })
    if (!r) return
    activeSlot = r.active
    buildRows()
    for (let i = 0; i < 8; i++) {
      const row = tbody.querySelector(`tr[data-slot="${i}"]`)
      const en = r.enables[i] || {}
      const nm = r.names[i] || {}
      row.querySelector('[data-act="active"]').checked = (i === r.active)
      row.querySelector('[data-act="hf"]').checked = !!en.hf
      row.querySelector('[data-act="lf"]').checked = !!en.lf
      row.querySelector('[data-act="hf-nick"]').value = nm[FreqType.HF] || ''
      row.querySelector('[data-act="lf-nick"]').value = nm[FreqType.LF] || ''
    }
    $('active-badge').textContent = `激活槽: ${r.active + 1}`
  }
  onConnected(refreshAll)
  $('refresh').addEventListener('click', refreshAll)

  tbody.addEventListener('change', async (e) => {
    const row = e.target.closest('tr'); if (!row) return
    const slot = +row.dataset.slot
    const act = e.target.dataset.act
    if (act === 'active') {
      await run('切换激活槽', () => ultra.cmdSlotSetActive(slot))
      activeSlot = slot; $('active-badge').textContent = `激活槽: ${slot + 1}`
    }
  })

  tbody.addEventListener('click', async (e) => {
    if (e.target.dataset.act !== 'save-row') return
    const row = e.target.closest('tr'); const slot = +row.dataset.slot
    const hf = row.querySelector('[data-act="hf"]').checked
    const lf = row.querySelector('[data-act="lf"]').checked
    const hfNick = row.querySelector('[data-act="hf-nick"]').value.trim()
    const lfNick = row.querySelector('[data-act="lf-nick"]').value.trim()
    const ok = await run('保存本槽', async (u) => {
      await u.cmdSlotSetEnable(slot, FreqType.HF, hf)
      await u.cmdSlotSetEnable(slot, FreqType.LF, lf)
      await u.cmdSlotSetFreqName(slot, FreqType.HF, hfNick)
      await u.cmdSlotSetFreqName(slot, FreqType.LF, lfNick)
      await u.cmdSlotSaveSettings()
    })
    if (ok) toast(`槽 ${slot + 1} 已保存`, 'ok')
  })

  // save-all button (scoped to this view)
  view.querySelector('[data-act="save"]').addEventListener('click', async () => {
    if (await run('保存全部', () => ultra.cmdSlotSaveSettings())) toast('已保存全部卡槽设置', 'ok')
  })
}

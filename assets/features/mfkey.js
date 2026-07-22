// MIFARE 密钥侦测 view — candidate-key sector bruteforce (cmdMf1CheckKeysOfSectors)
// plus Nested / Darkside / HardNested acquisition (returns attack parameters for
// offline cracking) and PRNG type detection.
import { onConnected, ultra, run, toast, toBuf, hex, Mf1KeyType, Mf1PrngType, Buffer } from '../app.js'

export function initMfkey () {
  const view = document.getElementById('view-mfkey')
  const $ = id => view.querySelector('#' + id)

  function setState (s) { $('mfkey-state').textContent = s }
  const setBitMSB = (buf, i) => { buf[Math.floor(i / 8)] |= (1 << (7 - (i % 8))) }

  // ---- 1. candidate-key sector bruteforce ----
  $('mfkey-run').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    let keys
    try {
      keys = $('mfkey-keys').value.split(/\r?\n/).map(s => s.trim()).filter(Boolean).map(s => {
        if (s.length !== 12) throw new Error(`密钥 "${s}" 需为 12 hex`)
        return toBuf(s)
      })
    } catch (e) { toast(e.message, 'err'); return }
    if (!keys.length) { toast('请至少填一个候选密钥', 'warn'); return }
    const start = +$('mfkey-sec-start').value
    const end = +$('mfkey-sec-end').value
    if (start > end || start < 0 || end > 39) { toast('扇区范围无效 (0–39)', 'warn'); return }

    const mask = Buffer.alloc(10)
    for (let i = start; i <= end; i++) setBitMSB(mask, i)

    setState(`爆破扇区 ${start}–${end}（${keys.length} 个候选密钥）…`)
    const res = await run('密钥爆破', u => u.cmdMf1CheckKeysOfSectors({ keys, mask }))
    if (res === null) { setState('失败'); return }

    const tbody = $('mfkey-result').querySelector('tbody')
    let rows = ''
    for (let i = start; i <= end; i++) {
      if (res.found.readBitMSB(i) === 1 && res.sectorKeys[i]) {
        rows += `<tr><td>扇区 ${i}</td><td class="mono">${hex(res.sectorKeys[i])}</td></tr>`
      }
    }
    tbody.innerHTML = rows || '<tr><td colspan="2">未找到命中密钥</td></tr>'
    setState(`完成，命中 ${tbody.children.length} 个扇区`)
    toast('密钥爆破完成', 'ok')
  })

  // ---- 2. acquisition (nested / darkside / hardnested / prng) ----
  function knownFromUI () {
    const key = toBuf($('acq-key').value)
    if (key.length !== 6) throw new Error('已知密钥需为 6 字节（12 hex）')
    return { block: +$('acq-block').value, keyType: +$('acq-keytype').value, key }
  }
  function targetFromUI () {
    return { block: +$('acq-target').value, keyType: +$('acq-targettype').value }
  }
  async function runAcq (label, fn) {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    try {
      const r = await fn(ultra)
      $('acq-result').textContent = typeof r === 'string'
        ? r
        : JSON.stringify(r, (k, v) => Buffer.isBuffer(v) ? v.toString('hex') : v, 2)
    } catch (e) {
      $('acq-result').textContent = `${label} 失败: ${String(e?.message ?? e)}`
      toast(`${label} 失败`, 'err')
    }
  }
  const fmtBuf = v => Buffer.isBuffer(v) ? v.toString('hex') : v
  $('acq-static').addEventListener('click', () => runAcq('Static Nested', u => u.cmdMf1AcquireStaticNested(knownFromUI(), targetFromUI())))
  $('acq-nested').addEventListener('click', () => runAcq('Nested', u => u.cmdMf1AcquireNested(knownFromUI(), targetFromUI())))
  $('acq-darkside').addEventListener('click', () => runAcq('Darkside', u => u.cmdMf1AcquireDarkside(+$('acq-block').value, +$('acq-keytype').value, true)))
  $('acq-hard').addEventListener('click', () => runAcq('HardNested', u => u.cmdMf1AcquireHardNested(knownFromUI(), targetFromUI())))
  $('acq-prng').addEventListener('click', () => runAcq('PRNG 类型', async u => {
    const t = await u.cmdMf1TestPrngType()
    return `PRNG 类型: ${Mf1PrngType[t] ?? t}\n(STATIC=固定随机数 / WEAK=弱随机数 / HARD=不可预测)`
  }))

  // ---- 3. extended acquisition (static encrypted nested / NT distance / NT level) ----
  $('acq-static-enc').addEventListener('click', () => runAcq('Static Encrypted Nested', u =>
    u.cmdMf1AcquireStaticEncryptedNested({ key: toBuf($('acq-key').value) })))
  $('acq-ntdist').addEventListener('click', () => runAcq('NT 距离', u =>
    u.cmdMf1TestNtDistance(knownFromUI())))
  $('acq-ntlevel').addEventListener('click', () => runAcq('NT 电平', u =>
    u.cmdMf1TestNtLevel()))

  // ---- 4. MIFARE 侦测日志 ----
  $('mfk-det-read').addEventListener('click', async () => {
    if (!ultra.isConnected()) { toast('请先连接设备', 'warn'); return }
    await run('读取侦测日志', async (u) => {
      const enabled = await u.cmdMf1GetDetectionEnable()
      const count = await u.cmdMf1GetDetectionCount()
      const logs = count ? await u.cmdMf1GetDetectionLogs(0) : []
      $('mfk-det-out').textContent =
        `侦测开关: ${enabled ? '开' : '关'}\n日志数: ${count}\n` +
        logs.map((l, i) => `#${i} block=${l.block} keyB=${l.isKeyB} nested=${l.isNested} uid=${hex(l.uid)} nt=${hex(l.nt)} nr=${hex(l.nr)} ar=${hex(l.ar)}`).join('\n')
    })
  })
}

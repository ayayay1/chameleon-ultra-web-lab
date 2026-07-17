// MIFARE 控制位转换 (access bits) — pure local computation, no device needed.
// Encodes/decodes the 3 access bytes (6 hex) of a sector trailer to/from the
// per-block C1/C2/C3 bits and the GPB. Implements the standard NXP layout:
//   byte6 = ~C2(high) | ~C1(low)      byte7 = C1(high) | ~C3(low)
//   byte8 =  C3(high) | GPB(low)
import { toast } from '../app.js'

// data-block access conditions by (C1,C2,C3)
const DATA_AC = {
  0b000: ['KeyA/B', 'KeyA/B', 'KeyA/B', 'KeyA/B'],
  0b001: ['KeyA/B', '—', '—', '—'],
  0b010: ['KeyA/B', 'KeyA/B', '—', '—'],
  0b011: ['KeyA/B', '—', '—', '—'],
  0b100: ['KeyA/B', 'KeyA/B', 'KeyA/B', 'KeyA/B'],
  0b101: ['KeyA/B', '—', 'KeyA/B', 'KeyA/B'],
  0b110: ['KeyA/B', '—', '—', '—'],
  0b111: ['KeyB', 'KeyB', '—', '—'],
}
// trailer (key block) access conditions by (C1,C2,C3)
const TRAILER_AC = {
  0b000: ['W(A|B) / 不可读', 'W(A|B) / 不可读', 'W(A|B) / 不可读'],
  0b001: ['W(A|B) / 不可读', 'W(KeyB) / 不可读', 'W(KeyB) / 可读'],
  0b010: ['W(KeyB) / 不可读', 'W(KeyB) / 不可读', 'W(KeyB) / 可读'],
  0b011: ['W(A|B) / 不可读', 'W(A|B) / 不可读', 'W(A|B) / 不可读'],
  0b100: ['W(KeyB) / 不可读', 'W(KeyB) / 不可读', 'W(KeyB) / 可读'],
  0b101: ['W(KeyB) / 不可读', 'W(KeyB) / 不可读', 'W(KeyB) / 可读'],
  0b110: ['W(KeyB) / 不可读', 'W(KeyB) / 不可读', 'W(KeyB) / 可读'],
  0b111: ['W(KeyB) / 不可读', 'W(KeyB) / 不可读', 'W(KeyB) / 不可读'],
}

export function initAccess () {
  const view = document.getElementById('view-access')
  const $ = id => view.querySelector('#' + id)

  const bit = (byte, i) => (byte >> (7 - i)) & 1 // MSB-first bit i (0..7)
  const setBit = (byte, i, v) => v ? (byte | (1 << (7 - i))) : (byte & ~(1 << (7 - i)))

  function decode (b6, b7, b8) {
    const c1 = [], c2 = [], c3 = []
    for (let i = 0; i < 4; i++) {
      c1[i] = bit(b7, i)        // byte7 high nibble (normal)
      c2[i] = bit(b6, i) ? 0 : 1 // byte6 high nibble (inverted)
      c3[i] = bit(b8, i)        // byte8 high nibble (normal)
    }
    const gpb = b8 & 0x0F
    return { c1, c2, c3, gpb }
  }
  function encode (c1, c2, c3, gpb) {
    let b6 = 0, b7 = 0, b8 = 0
    for (let i = 0; i < 4; i++) {
      b6 = setBit(b6, i, c2[i] ? 0 : 1) // ~c2
      b7 = setBit(b7, i, c1[i])          // c1
      b8 = setBit(b8, i, c3[i])          // c3
    }
    for (let i = 0; i < 4; i++) { b6 = setBit(b6, i + 4, c1[i] ? 0 : 1) } // ~c1 low
    for (let i = 0; i < 4; i++) { b7 = setBit(b7, i + 4, c3[i] ? 0 : 1) } // ~c3 low
    b8 = (b8 & 0xF0) | (gpb & 0x0F)
    return [b6, b7, b8]
  }

  // ---- decode UI ----
  $('ac-decode').addEventListener('click', () => {
    const hexStr = $('ac-hex').value.replace(/\s+/g, '')
    if (hexStr.length !== 6 || /[^0-9a-fA-F]/.test(hexStr)) { toast('访问位需为 6 hex', 'warn'); return }
    const b = parseInt(hexStr, 16)
    const b6 = (b >> 16) & 0xFF, b7 = (b >> 8) & 0xFF, b8 = b & 0xFF
    const { c1, c2, c3, gpb } = decode(b6, b7, b8)
    let html = '<table><thead><tr><th>块</th><th>C1C2C3</th><th>读</th><th>写</th><th>增</th><th>减/传/恢</th></tr></thead><tbody>'
    for (let i = 0; i < 3; i++) {
      const ac = DATA_AC[(c1[i] << 2) | (c2[i] << 1) | c3[i]]
      html += `<tr><td>数据块 ${i}</td><td class="mono">${c1[i]}${c2[i]}${c3[i]}</td><td>${ac[0]}</td><td>${ac[1]}</td><td>${ac[2]}</td><td>${ac[3]}</td></tr>`
    }
    const tac = TRAILER_AC[(c1[3] << 2) | (c2[3] << 1) | c3[3]]
    html += `<tr><td>尾块 (KeyA)</td><td class="mono">${c1[3]}${c2[3]}${c3[3]}</td><td colspan="4">${tac[0]}</td></tr>`
    html += `<tr><td>尾块 (AccessBits)</td><td class="mono"></td><td colspan="4">${tac[1]}</td></tr>`
    html += `<tr><td>尾块 (KeyB)</td><td class="mono"></td><td colspan="4">${tac[2]}</td></tr>`
    html += `</tbody></table>`
    html += `<p class="hint mono">GPB = 0x${gpb.toString(16).toUpperCase().padStart(2, '0')} · 原始字节: ${b6.toString(16).toUpperCase().padStart(2, '0')} ${b7.toString(16).toUpperCase().padStart(2, '0')} ${b8.toString(16).toUpperCase().padStart(2, '0')}</p>`
    $('ac-decode-out').innerHTML = html
  })

  // ---- build UI ----
  const blockNames = ['数据块 0', '数据块 1', '数据块 2', '尾块 (KeyA/Acc/KeyB)']
  let buildHtml = ''
  for (let i = 0; i < 4; i++) {
    buildHtml += `<div class="row" style="margin-top:6px"><label style="margin:0;width:160px">${blockNames[i]} C1C2C3</label>`
    buildHtml += `<select id="ac-build-${i}">` + [0, 1, 2, 3, 4, 5, 6, 7].map(v => `<option value="${v}">${v} (${v.toString(2).padStart(3, '0')})</option>`).join('') + '</select></div>'
  }
  buildHtml += '<div class="row" style="margin-top:6px"><label style="margin:0;width:160px">GPB (0–F)</label><input type="text" id="ac-build-gpb" maxlength="1" value="0" style="width:60px"></div>'
  $('ac-build').innerHTML = buildHtml

  $('ac-build-run').addEventListener('click', () => {
    const c1 = [], c2 = [], c3 = []
    for (let i = 0; i < 4; i++) {
      const v = +$(`ac-build-${i}`).value
      c1[i] = (v >> 2) & 1; c2[i] = (v >> 1) & 1; c3[i] = v & 1
    }
    const gpb = parseInt($('ac-build-gpb').value || '0', 16) & 0xF
    const [b6, b7, b8] = encode(c1, c2, c3, gpb)
    const hexStr = (b6 << 16 | b7 << 8 | b8).toString(16).toUpperCase().padStart(6, '0')
    $('ac-build-out').textContent = `访问位字节: ${hexStr}  (= ${b6.toString(16).toUpperCase().padStart(2, '0')} ${b7.toString(16).toUpperCase().padStart(2, '0')} ${b8.toString(16).toUpperCase().padStart(2, '0')})`
    toast('已计算访问位', 'ok')
  })
}

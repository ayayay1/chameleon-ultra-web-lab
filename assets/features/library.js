// 收藏 / 文件库：用 IndexedDB 持久化卡片记录，支持保存、载入到卡槽、删除、重命名。
import { onConnected, ultra, run, toast, toBuf, TagType, DeviceMode } from '../app.js'

const DB_NAME = 'chameleon-web'
const STORE = 'cards'

function openDB () {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' })
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function saveToLibrary (record) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put({
      ...record,
      id: record.id || (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)),
      created: record.created || Date.now(),
    })
    tx.oncomplete = () => resolve(true)
    tx.onerror = () => reject(tx.error)
  })
}

export async function getLibrary () {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function deleteCard (id) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).delete(id)
    tx.oncomplete = () => resolve(true)
    tx.onerror = () => reject(tx.error)
  })
}

export function initLibrary () {
  const view = document.getElementById('view-library')
  const $ = id => view.querySelector('#' + id)

  const typeLabel = t => ({
    MF1_1K: 'MIFARE 1K', MFU: 'MFU/NTAG', EM410X: 'EM410x', HID: 'HID Prox', HF14A: 'HF14A', RAW: 'RAW',
  }[t] || t)

  async function render () {
    let cards = []
    try { cards = await getLibrary() } catch (e) { toast('读取收藏失败: ' + e, 'err'); return }
    cards.sort((a, b) => b.created - a.created)
    const tbody = $('lib-tbody')
    if (!cards.length) { tbody.innerHTML = '<tr><td colspan="4">暂无收藏，可在「读卡」页扫描后保存</td></tr>'; return }
    tbody.innerHTML = cards.map(c => `
      <tr>
        <td>${c.name}</td>
        <td>${typeLabel(c.type)}</td>
        <td class="mono" style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.snippet || ''}</td>
        <td>
          <button class="small" data-load="${c.id}">载入</button>
          <button class="small danger" data-del="${c.id}">删除</button>
        </td>
      </tr>`).join('')
  }

  $('lib-refresh').addEventListener('click', render)
  $('lib-tbody').addEventListener('click', async (e) => {
    const id = e.target?.dataset?.load || e.target?.dataset?.del
    if (!id) return
    if (e.target.dataset.del != null) {
      if (!confirm('确认删除该收藏？')) return
      await deleteCard(id); toast('已删除', 'ok'); render(); return
    }
    const cards = await getLibrary()
    const c = cards.find(x => x.id === id)
    if (c) await loadCard(c)
  })

  async function loadCard (c) {
    if (c.type === 'EM410X') {
      await run('载入 EM410x', async (u) => { await u.cmdEm410xSetEmuId(toBuf(c.data)); return true })
      toast('已写入 EM410x 模拟 ID', 'ok')
    } else if (c.type === 'HID') {
      await run('载入 HID', async (u) => { await u.cmdHidProxSetEmu(c.data); return true })
      toast('已写入 HID 模拟', 'ok')
    } else if (c.type === 'MF1_1K') {
      const buf = toBuf(c.data)
      if (buf.length !== 1024) { toast('数据长度异常（需 1024 字节）', 'err'); return }
      await run('载入 MIFARE 1K', async (u) => {
        await u.cmdChangeDeviceMode(DeviceMode.TAG)
        await u.cmdMf1WriteEmuBlockData(0, buf.subarray(0, 512))
        await u.cmdMf1WriteEmuBlockData(32, buf.subarray(512, 1024))
        return true
      })
      toast('已写入模拟槽（64 块）', 'ok')
    } else {
      toast('该类型暂不支持自动载入', 'warn')
    }
  }

  onConnected(render)
  render()
}

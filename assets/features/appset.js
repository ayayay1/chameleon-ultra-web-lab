// 应用设置：主题（深/浅）与语言偏好（持久化到 localStorage）。
import { toast } from '../app.js'

export function initAppSettings () {
  const view = document.getElementById('view-appset')
  const $ = id => view.querySelector('#' + id)

  const theme = localStorage.getItem('theme') || 'dark'
  applyTheme(theme)
  $('theme').value = theme
  $('theme').addEventListener('change', () => {
    applyTheme($('theme').value)
    localStorage.setItem('theme', $('theme').value)
    toast('主题已切换', 'ok')
  })

  const lang = localStorage.getItem('lang') || 'zh'
  $('lang').value = lang
  $('lang').addEventListener('change', () => {
    localStorage.setItem('lang', $('lang').value)
    toast('语言偏好已保存（界面多语言将在后续版本完善）', 'warn')
  })

  function applyTheme (t) {
    document.body.classList.toggle('light', t === 'light')
    document.body.classList.toggle('dark', t === 'dark')
  }
}

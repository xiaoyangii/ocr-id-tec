// 约定一个通用的键名
const INFO_KEY = 'user_info'
const HISTORY_KEY = 'history_list'
const DOWNLOAD_KEY = 'download_list'
const RECYCLE_KEY = 'recycle_list'

// 获取个人信息
export const getInfo = () => {
  const defaultObj = { satoken: '', loginId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}

// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 更新token
export const setToken = (newToken) => {
  const result = localStorage.getItem(INFO_KEY)
  const info = JSON.parse(result)
  info.token = newToken
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// 设置搜索历史
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}

// 获取下载历史
export const getDownloadList = () => {
  const result = localStorage.getItem(DOWNLOAD_KEY)
  return result ? JSON.parse(result) : []
}

// 设置下载历史
export const setDownloadList = (arr) => {
  localStorage.setItem(DOWNLOAD_KEY, JSON.stringify(arr))
}

// 获取回收站历史
export const getrecyclebinList = () => {
  const result = localStorage.getItem(RECYCLE_KEY)
  return result ? JSON.parse(result) : []
}

// 设置回收站历史
export const setrecyclebinList = (arr) => {
  localStorage.setItem(RECYCLE_KEY, JSON.stringify(arr))
}
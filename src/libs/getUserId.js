/**
 * 取得 localStorage 的 userId
 * @returns {import('vue').Ref<string>} userId - 使用 computed 包裝的 localStorage 的 userId
 */
const getUserId = () => {
  return localStorage.getItem('userId')
}

export default getUserId

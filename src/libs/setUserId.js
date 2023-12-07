/**
 * 將使用者ID設定到本地儲存中
 * @param {Object} data - 使用者資料
 * @param {Object} data.user - 使用者物件
 * @param {string} data.user.id - 使用者ID
 */
const setUserId = (data) => {
  localStorage.setItem('userId', data.user.id)
}

export default setUserId

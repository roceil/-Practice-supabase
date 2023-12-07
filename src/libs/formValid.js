/**
 * 檢查表單是否有效
 * @param {object} form - 表單物件
 * @param {string} form.password - 密碼欄位的值
 * @param {string} form.confirmPassword - 確認密碼欄位的值
 * @returns {boolean} - 如果表單有效則返回 true，否則返回 false
 */
const formValid = (form) => {
  if (form.password !== form.confirmPassword) {
    alert('兩次密碼不相符')
    return false
  }

  return true
}

export default formValid

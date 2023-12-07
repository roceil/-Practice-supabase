/**
 * 更改按鈕狀態的函式
 * @param {Object} buttonStatus - 按鈕狀態的物件
 * @param {string} status - 欲設定的狀態
 */
const changeButtonStatus = (buttonStatusRef, status) => {
  console.log('buttonStatus', buttonStatusRef)
  console.log('status', status)
  buttonStatusRef.value = status
}

export default changeButtonStatus

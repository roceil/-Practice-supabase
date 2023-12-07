/**
 * 判斷付款狀態
 * @param {boolean} status - 付款狀態，true代表已付款，false代表未付款
 * @returns {string} - 返回付款狀態的文字描述，"已付款"或"未付款"
 */
const isPaid = (status) => {
  return status ? "已付款" : "未付款";
};

export default isPaid;
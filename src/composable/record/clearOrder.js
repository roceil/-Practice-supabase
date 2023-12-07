import dayjs from 'dayjs'

const today = dayjs().format('YYYY-MM-DD')

/**
 * 清除訂單的內容
 * @param {Object} order - 訂單物件
 */

const clearOrder = (order) => {
  order.date = today
  order.store = ''
  order.main.name = ''
  order.main.price = ''
  order.side.name = ''
  order.side.price = ''
  order.drink.name = ''
  order.drink.price = ''
}

export default clearOrder

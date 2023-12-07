import supabase from '@/supabase'
import createRecordNumber from './createRecordNumber'
import getUserId from '../../libs/getUserId'

// 記錄編號
const recordNumber = createRecordNumber()

// 取得 localStorage 的 userId
const userId = getUserId()

/**
 * 在 records 資料表中插入一筆新紀錄。
 *
 * @param {number} userId - 使用者 ID
 * @param {object} order - 訂單資訊
 * @param {string} order.store - 商店名稱
 * @param {string} order.main.name - 主餐名稱
 * @param {number} order.main.price - 主餐價格
 * @param {string} order.side.name - 副餐名稱
 * @param {number} order.side.price - 副餐價格
 * @param {string} order.drink.name - 飲料名稱
 * @param {number} order.drink.price - 飲料價格
 * @param {number} total.value - 總價格
 * @param {string} order.date - 購買日期
 * @returns {Promise<object>} - 插入的紀錄資料
 */

const addRecord = async (order, total) => {
  const { data, error } = await supabase
    .from('records')
    .insert([
      {
        user: userId,
        store: order.store,
        record_number: recordNumber,
        main: order.main.name,
        main_price: order.main.price,
        side: order.side.name,
        side_price: order.side.price,
        drink: order.drink.name,
        drink_price: order.drink.price,
        total_price: total,
        purchase_date: order.date
      }
    ])
    .select()

  if (error) {
    if (error.code === '22P02') {
      throw new Error('請輸入完整資料')
    }
    throw new Error('記帳失敗')
  }

  return data
}

export default addRecord

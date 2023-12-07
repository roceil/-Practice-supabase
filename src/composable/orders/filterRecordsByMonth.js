// filterRecordsByMonth.js
import dayjs from 'dayjs'

/**
 * 根據指定月份篩選記錄
 * @param {Array} records - 記錄陣列
 * @param {string} month - 指定月份 (格式: 'MM')
 * @returns {Array} - 篩選後的記錄陣列
 */
const filterRecordsByMonth = (originalRecords, month) => {
  return originalRecords.filter((record) => dayjs(record.purchase_date).format('MM') === month)
}

export default filterRecordsByMonth

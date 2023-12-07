import dayjs from 'dayjs'

/**
 * 當前月份篩選器
 * @param {Array} record - 要篩選的記錄數組
 * @param {string} currentMonth - 當前月份，格式為 'MM'
 * @returns {Array} - 篩選後的數組
 */

const currentMonthFilter = (record, currentMonth) => {
  const filterData = record.filter((item) => {
    return dayjs(item.purchase_date).format('MM') === currentMonth
  })

  return filterData
}

export default currentMonthFilter

import dayjs from 'dayjs'

/**
 * 將日期轉換為YYYY-MM-DD格式的字串
 * @param {Date} date - 要轉換的日期
 * @returns {string} - 轉換後的日期字串
 */
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

export default formatDate

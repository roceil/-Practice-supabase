import dayjs from 'dayjs'

/**
 * 產生記錄編號
 * @returns {string} 記錄編號
 */
const createRecordNumber = () => {
  const date = dayjs().format('YYYYMMDD')
  const time = dayjs().format('HHmm')
  const random = Math.floor(Math.random() * 1000)
  return `${date}${time}${random}`
}

export default createRecordNumber

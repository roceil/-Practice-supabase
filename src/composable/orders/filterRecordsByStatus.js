/**
 * 根據狀態篩選記錄
 * @param {string} status - 狀態值，可選值為 'all', 'unpaid', 'paid'
 * @param {Array} originalRecords - 原始記錄數組
 * @returns {Array} - 篩選後的記錄數組
 */
const filterRecordsByStatus = (status, originalRecords) => {
  if (status === 'all') {
    return originalRecords
  }

  if (status === 'unpaid') {
    return originalRecords.filter((record) => record.status === false)
  }

  if (status === 'paid') {
    return originalRecords.filter((record) => record.status === true)
  }
}

export default filterRecordsByStatus
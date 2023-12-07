import supabase from '@/supabase'

/**
 * 獲取使用者的記錄
 * @param {string} userId - 使用者ID
 * @returns {Promise<Array>} - 使用者的記錄數據
 */
const getRecords = async (userId) => {
  const { data, error } = await supabase.from('records').select('*').eq('user', userId)

  if (error) {
    console.log(error)
    return
  }

  return data
}

export default getRecords

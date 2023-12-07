import supabase from '@/supabase'

/**
 * 更新記錄的狀態
 * @param {string} recordId - 記錄的ID
 * @returns {Promise<void>}
 */
const updateRecord = async (recordId) => {
  const { error } = await supabase.from('records').update({ status: true }).eq('id', recordId)

  if (error) {
    console.log(error)
    return
  }
}

export default updateRecord

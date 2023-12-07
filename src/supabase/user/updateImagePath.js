import supabase from '@/supabase'

/**
 * 更新使用者圖片路徑
 * @param {string} newImageUrl - 新的圖片路徑
 * @param {string} userId - 使用者ID
 * @returns {Promise<Object>} - 更新後的使用者資料
 */

const updateImagePath = async (newImageUrl, userId) => {
  const { data, error } = await supabase
    .from('users')
    .update({ image_path: newImageUrl })
    .eq('id', userId)

  if (error) {
    throw new Error(error)
  }

  return data
}

export default updateImagePath

import supabase from '@/supabase'

/**
 * 插入使用者資料到資料庫
 * @param {Object} res - 使用者回應物件
 * @returns {Promise<Object>} - 插入的使用者資料
 */
const insertUser = async (res) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ id: res.user.id, email: res.user.email }])
    .select()

  if (error) {
    alert(error.message)
    return
  }

  return data
}

export default insertUser

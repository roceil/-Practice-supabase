import supabase from '@/supabase'

/**
 * 使用提供的表單資料註冊使用者。
 * @param {Object} form - 包含帳號和密碼的表單資料。
 * @param {string} form.account - 使用者的電子郵件地址。
 * @param {string} form.password - 使用者的密碼。
 * @returns {Promise<Object>} - 如果註冊成功，則解析為使用者資料的 Promise，否則拒絕並返回錯誤。
 */
const signUp = async (form) => {
  const { data, error } = await supabase.auth.signUp({
    email: form.account,
    password: form.password
  })

  if (error) {
    alert('此帳號已被註冊')
    return
  }

  return data
}

export default signUp

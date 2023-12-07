import supabase from '@/supabase'

/**
 * 登入函式
 * @param {Object} form - 登入表單資料
 * @param {string} form.account - 使用者帳號
 * @param {string} form.password - 使用者密碼
 * @returns {Promise<Object>} - 登入結果
 */
const login = async (form) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.account,
    password: form.password
  })

  if (error) {
    alert('帳號或密碼錯誤')
    return
  }

  return data
}

export default login

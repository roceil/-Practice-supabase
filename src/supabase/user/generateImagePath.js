import supabase from '@/supabase'

/**
 * 產生圖片路徑
 * @param {string} name - 圖片名稱
 * @returns {Promise<string>} - 簽署的圖片路徑
 */

const generateImagePath = async (name) => {
  const { data } = await supabase.storage.from('avatars').createSignedUrl(name, 31536000000) // 第二個參數為過期時間，單位為毫秒，如果時間要拉成一年，可以用 365 * 24 * 60 * 60 * 1000 = 31536000000
  return data.signedUrl
}

export default generateImagePath

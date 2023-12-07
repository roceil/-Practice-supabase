import supabase from '@/supabase'

/**
 * 上傳圖片至 supabase
 * @param {File} file - 要上傳的圖片檔案
 * @param {string} name - 圖片檔案的名稱
 * @returns {Promise<void>} - 上傳圖片的結果
 */

const uploadImage = async (name, file) => {
  const { error: uploadError } = await supabase.storage.from('avatars').upload(name, file)

  if (uploadError) {
    alert(uploadError.message)
    return
  }
}

export default uploadImage

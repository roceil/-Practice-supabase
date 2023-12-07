import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import uploadImage from '@/composable/user/uploadImage'

// mock supabase
vi.mock('@/supabase', () => {
  return {
    default: {
      storage: {
        from: () => ({
          upload: (name) => {
            if (name === 'test.png') {
              return Promise.resolve({ data: null, error: null })
            } else {
              return Promise.reject({ data: null, error: { message: 'Upload failed' } })
            }
          }
        })
      }
    }
  }
})

describe('uploadImage', () => {
  let originalAlert

  // 在所有測試之前，模擬 window.alert
  beforeAll(() => {
    originalAlert = window.alert // 保存原始的 alert 函數
    window.alert = vi.fn() // 使用模擬的 alert
  })

  // 測試完畢後清除模擬
  afterAll(() => {
    window.alert = originalAlert // 恢復原始的 alert 函數
  })

  it('成功上傳圖片', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    const result = await uploadImage(file.name, file)
    expect(result).toBeUndefined()
  })

  it('上傳圖片失敗', async () => {
    const file = new File(['test'], 'fail.png', { type: 'image/png' })
    try {
      await uploadImage(file, file.name)
      throw new Error('Upload failed')
    } catch (error) {
      expect(error.error.message).toBe('Upload failed')
    }
  })
})

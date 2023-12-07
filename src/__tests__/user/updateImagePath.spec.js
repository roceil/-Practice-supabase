import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import updateImagePath from '@/composable/user/updateImagePath'

// mock supabase
vi.mock('@/supabase', () => {
  return {
    default: {
      from: () => ({
        update: (data) => ({
          eq: (columnName, userId) => {
            const { image_path } = data
            if (userId === 1) {
              return Promise.resolve({
                data: [{ [columnName]: userId, image_path }],
                error: null
              })
            } else {
              return Promise.reject({ data: null, error: { message: 'Update failed' } })
            }
          }
        })
      })
    }
  }
})

describe('updateImagePath', () => {
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

  it('成功更新使用者圖片路徑', async () => {
    const newImageUrl = 'https://test.com/test.png'
    const userId = 1
    const result = await updateImagePath(newImageUrl, userId)
    expect(result).toEqual([{ id: 1, image_path: newImageUrl }])
  })

  it('更新使用者圖片路徑失敗', async () => {
    const newImageUrl = 'https://test.com/test.png'
    const userId = 2
    try {
      await updateImagePath(newImageUrl, userId)
      throw new Error('Update failed')
    } catch (error) {
      expect(error.error.message).toBe('Update failed')
    }
  })
})

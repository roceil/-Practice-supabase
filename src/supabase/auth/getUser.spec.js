import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import getUser from '@/supabase/auth/getUser'

// 模擬 supabase 以涵蓋成功和失敗的案例
vi.mock('@/supabase', () => {
  return {
    default: {
      from: () => ({
        select: () => ({
          eq: (columnName, userId) => {
            if (userId === 1) {
              // 成功案例
              return Promise.resolve({ data: [{ [columnName]: userId }], error: null })
            } else {
              // 失敗案例
              return Promise.resolve({ data: null, error: { message: 'User not found' } })
            }
          }
        })
      })
    }
  }
})

describe('getUser', () => {
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
  it('取得使用者資料', async () => {
    const userId = 1
    const result = await getUser(userId)
    expect(result).toEqual([{ id: userId }])
  })

  it('取得使用者資料失敗', async () => {
    const userId = 2
    try {
      await getUser(userId)
    } catch (error) {
      expect(error.message).toBe('User not found')
    }
  })
})

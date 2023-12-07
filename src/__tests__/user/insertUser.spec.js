import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import insertUser from '@/composable/user/insertUser'

// 模拟 supabase
vi.mock('@/supabase', () => {
  return {
    default: {
      from: () => ({
        insert: (data) => ({
          select: () => {
            const { id, email } = data[0]
            if (id === 1) {
              return Promise.resolve({
                data: [{ id, email }],
                error: null
              })
            } else {
              return Promise.reject({ data: null, error: { message: 'Insert failed' } })
            }
          }
        })
      })
    }
  }
})

describe('insertUser', () => {
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
  it('成功插入使用者資料', async () => {
    const id = 1
    const email = 'test@gmail.com'
    const res = { user: { id, email } }
    const result = await insertUser(res)
    expect(result).toEqual([{ id, email }])
  })

  it('插入使用者資料失敗', async () => {
    const id = 2
    const email = 'fail@gmail.com'
    const res = { user: { id, email } }
    try {
      await insertUser(res)
      throw new Error('Insert failed')
    } catch (error) {
      expect(error.error.message).toBe('Insert failed')
    }
  })
})

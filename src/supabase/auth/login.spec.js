import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import login from '@/supabase/auth/login'

// mock supabase
vi.mock('@/supabase', () => {
  const mockSignInWithPassword = vi.fn(({ email }) => {
    if (email === 'fail@example.com') {
      return Promise.resolve({ data: null, error: { message: '帳號或密碼錯誤' } })
    }
    return Promise.resolve({ data: { user: { id: 1, email } }, error: null })
  })

  return {
    default: {
      auth: {
        signInWithPassword: mockSignInWithPassword
      }
    }
  }
})

describe('login', () => {
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

  it('成功登入', async () => {
    const form = { account: 'success@example.com', password: 'password123' }
    const result = await login(form)
    expect(result).toEqual({ user: { id: 1, email: form.account } })
  })

  it('登入失敗', async () => {
    const form = { account: 'fail@example.com', password: 'password123' }
    await login(form)
    expect(window.alert).toHaveBeenCalledWith('帳號或密碼錯誤')
  })
})

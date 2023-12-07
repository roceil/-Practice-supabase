import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import signUp from '@/supabase/auth/signUp'

vi.mock('@/supabase', () => {
  const mockSignUp = vi.fn(({ email }) => {
    if (email === 'success@example.com') {
      return Promise.resolve({ data: { user: { id: 1, email } }, error: null })
    }

    if (email === 'fail@example.com') {
      return Promise.resolve({ data: null, error: { message: '此帳號已被註冊' } })
    }
  })

  return {
    default: {
      auth: {
        signUp: mockSignUp
      }
    }
  }
})

describe('signUp', () => {
  let originalAlert

  beforeAll(() => {
    originalAlert = window.alert
    window.alert = vi.fn()
  })

  afterAll(() => {
    window.alert = originalAlert
  })

  it('成功註冊', async () => {
    const form = { account: 'success@example.com', password: 'password123' }
    const result = await signUp(form)
    expect(result).toEqual({ user: { id: 1, email: 'success@example.com' } })
  })

  it('註冊失敗', async () => {
    const form = { account: 'fail@example.com', password: 'password123' }
    await signUp(form)
    expect(window.alert).toHaveBeenCalledWith('此帳號已被註冊')
  })
})

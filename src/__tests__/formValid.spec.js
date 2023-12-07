import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import formValid from '../libs/formValid'

describe('formValid 函數測試', () => {
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

  it('當密碼和確認密碼相同時應返回 true', () => {
    const form = { password: '123456', confirmPassword: '123456' }
    expect(formValid(form)).toBe(true)
    expect(window.alert).not.toHaveBeenCalled()
  })

  it('當密碼和確認密碼不相同時應返回 false', () => {
    const form = { password: '123456', confirmPassword: '654321' }
    expect(formValid(form)).toBe(false)
    expect(window.alert).toHaveBeenCalledWith('兩次密碼不相符')
  })
})

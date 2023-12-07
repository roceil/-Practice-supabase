import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import LoginForm from '@/containers/LoginForm.vue'
import login from '@/composable/auth/login'

// 模擬 login function
vi.mock('@/composable/auth/login', () => {
  return {
    default: vi.fn() // 模擬函數
  }
})

describe('登入表單', () => {
  it('login function 有被觸發', async () => {
    // 創建模擬的 router
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '', component: {} }]
    })

    // 掛載 LoginForm 組件，並提供模擬的 router
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [router] // 使用模擬的 router
      }
    })

    // 填寫表單數據
    wrapper.find('input[id="帳號"]').setValue('example@example.com')
    wrapper.find('input[id="密碼"]').setValue('password')

    // 模擬表單提交
    await wrapper.find('form').trigger('submit.prevent')

    // 檢查 login 函數是否被調用
    expect(login).toBeCalled()
  })
})

// 測試的重點是點擊 submit 按鈕時，login 函式有沒有被呼叫，所以 login 先 mock 起來，最後只要斷言 login 函式有被呼叫即可。

// 其中因為 LoginForm 組件使用了 vue-router，所以在測試時需要提供模擬的 router，這裡使用 createRouter 創建模擬的 router，並在 mount 時提供給 global.plugins。路由部份因為只是要測試頁面會不會跳轉，所以只需要提供空的 routes 即可。

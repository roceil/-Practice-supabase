import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormInput from '@/components/FormInput.vue'

describe('FormInput', () => {
  it('當沒有輸入時，不觸發 update:modelValue 事件', async () => {
    const wrapper = mount(FormInput, {
      props: {
        modelValue: '',
        itemName: '帳號'
      }
    })

    // 找到輸入框並填入測試資料
    wrapper.find('input')

    // 檢查是否觸發了 update:modelValue 事件
    expect(wrapper.emitted()['update:modelValue']).toBeFalsy()
    expect(wrapper.emitted()['update:modelValue']).toBeUndefined()
  })
  it('當輸入改變時，應該觸發 update:modelValue 事件', async () => {
    const wrapper = mount(FormInput, {
      props: {
        modelValue: '',
        itemName: '帳號'
      }
    })

    // 找到輸入框並填入測試資料
    const input = wrapper.find('input')
    await input.setValue('new value')

    // 檢查是否觸發了 update:modelValue 事件
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['new value'])
  })
})

// wrapper.emitted() 會回傳一個物件，裡面包含了所有觸發過的事件，以事件名稱為 key，觸發的次數為 value，例如：
// {
//   'update:modelValue': [
//     ['new value']
//   ]
// }
// 這邊我們可以看到 update:modelValue 事件被觸發了一次，並且傳入了 ['new value'] 作為參數。
// 所以我們可以透過 wrapper.emitted()['update:modelValue'] 來取得這個事件被觸發的次數，以及參數。
// 如果emits 沒有被觸發的話，因為沒有這個事件，所以會回傳 undefined，所以我們可以透過 toBeTruthy() 來檢查是否有觸發過這個事件。

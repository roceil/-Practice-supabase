import { describe, it, expect } from 'vitest'
import isPaid from '@/libs/isPaid'

describe('isPaid', () => {
  it('回應『已付款』', () => {
    const status = true
    const result = isPaid(status)
    expect(result).toBe('已付款')
  })

  it('回應『未付款』', () => {
    const status = false
    const result = isPaid(status)
    expect(result).toBe('未付款')
  })
})

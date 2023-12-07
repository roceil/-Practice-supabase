import { describe, it, expect } from 'vitest'
import formatDate from '../libs/formatDate'

describe('formatDate', () => {
  it('回傳日期格式：YYYY-MM-DD', () => {
    const date = '2021-01-01T03:49:59.923Z'
    const result = formatDate(date)
    expect(result).toBe('2021-01-01')
  })
})

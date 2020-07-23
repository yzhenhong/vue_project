/* eslint-disable no-undef */
import { formateDate } from '@/utils'

describe('BaseDialog.vue', () => {
  it('formate date correct', () => {
    expect(formateDate(1231232131231)).toBe('2009-01-06 16:55')
  })
  it('formate date pass f', () => {
    expect(formateDate(1231232131231, 'YYYY-MM-DD')).toBe('2009-01-06')
  })
  it('formate date error', () => {
    // console.log(expect())
    expect(() => { formateDate('fsdfs') }).toThrow('Invalid Date')
  })
})

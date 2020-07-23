import dayjs from 'dayjs'
/**
 *
 * @param {number|sring|Date} d 日期支持字符串和时间戳
 * @param {string} f 格式化格式
 */
export function formateDate (d, f = 'YYYY-MM-DD HH:mm') {
  const tsRe = /\d{10}|\d{13}/
  if (typeof d === 'string' && tsRe.test(d)) {
    d = parseInt(d)
  }
  if (typeof d === 'number' && d.toString().length === 10) {
    d *= 1000
  }
  const date = new Date(d)
  if (date.toString() === 'Invalid Date') {
    throw new Error('Invalid Date')
  } else {
    return dayjs(date)
      .format(f)
  }
}

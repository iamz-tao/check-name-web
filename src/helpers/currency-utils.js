
import currency from 'currency.js'

const THB = value => currency(value, { symbol: '฿', precision: 0, decimal: ',' })

export {
  THB,
}

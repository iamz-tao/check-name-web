export const normalizeAmount = (val) => {
  if (!val) {
    return ''
  }
  const temp = val.toString().replace(/,/g, '')
  const parts = temp.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export const valueParser = (val) => {
  if (val) {
    return val.toString().replace(/,/g, '')
  }
  return ''
}

export const calculateEstimatePrice = ({ grossPrice, fee_rate }) => {
  const net_price = ((1 - fee_rate) * valueParser(grossPrice)).toFixed(2)
  return normalizeAmount(net_price)
}

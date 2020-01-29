/* eslint-disable */
import numeral from 'numeral'
import isNaN from 'lodash/isNaN'
import { monthsName } from '~/config/constants'


export const disableButton = (btnIds, disabled = true) => {
  for (let id of btnIds) {
    const elem = document.getElementById(id)
    if (elem) {
      elem.disabled = disabled
    }
  }
}
// eslint-disable-next-line no-extend-native
String.prototype.toCapitalize = function () {
  const str = this.split('')
  str[0] = str[0].toUpperCase()
  return str.join('')
}

export const dateSlotFormat = (date, length = 3) => {
  // eslint-disable-next-line no-unused-vars
  const [_, m, d] = date.split('-')
  const month = monthsName[+m - 1].substr(0, length)
  return `${d} ${month.toCapitalize()}`
}

export const currency = (number, format = '0,0.[00]') => numeral(number)
  .format(format)

export const toDecimal = (number, length = 2) => {
  if (number % 1 === 0) {
    return number
  }

  return number.toFixed(length)
}

Number.prototype.toCurrency = function () {
  return numeral(this)
    .format('0,0')
}

String.prototype.toInt = function () {
  const str = this
  const toInt = +str
  if (isNaN(toInt)) {
    return 0
  }
  return toInt
}

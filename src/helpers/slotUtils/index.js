import endOfMonth from 'date-fns/end_of_month'
import addMonths from 'date-fns/add_months'
import subDays from 'date-fns/sub_days'
import format from 'date-fns/format'
import startOfMonth from 'date-fns/start_of_month'

const monthHaveTwentyNineDay = [2]
const monthHaveThirtyDay = [4, 6, 9, 11]
const monthHaveThirtyOneDay = [1, 3, 5, 7, 8, 10, 12]

export const dateFormat = (dateString, defaultFormat = 'YYYY-MM-DD') => format(dateString, defaultFormat)

export const getSaleSlotsPeriod = (today) => {
  const startOfPeriod = startOfMonth(today)
  const endOfPeriod = endOfMonth(addMonths(startOfPeriod, 6))
  return {
    startOfPeriod: dateFormat(startOfPeriod),
    endOfPeriod: dateFormat(endOfPeriod)
  }
}

const isInvalidDate = (thisMonth, date) => (
  (+date >= 29 && monthHaveTwentyNineDay.indexOf(+thisMonth) > -1)
  || (+date >= 30 && monthHaveThirtyDay.indexOf(+thisMonth) > -1)
  || (+date >= 31 && monthHaveThirtyOneDay.indexOf(+thisMonth) > -1)
)

export const getStartDate = (date, month) => {
  const thisMonth = month.split('-')[1]
  const dateString = isInvalidDate(thisMonth, date) ? endOfMonth(month) : `${month}-${date}`
  return dateFormat(dateString)
}

const setDate = (fullDate, setter) => {
  const formatted = dateFormat(fullDate)
  const [fullYear, thisMonth] = formatted.split('-')

  if (isInvalidDate(thisMonth, setter)) {
    return endOfMonth(`${fullYear}-${thisMonth}`)
  }

  return [fullYear, thisMonth, setter].join('-')
}

export const getEndDate = (start_date, date) => {
  const monthAdded = addMonths(start_date, 1)

  const afterSetDate = setDate(monthAdded, date)

  return dateFormat(subDays(afterSetDate, 1))
}

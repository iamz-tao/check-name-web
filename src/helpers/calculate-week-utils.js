import moment from 'moment'

export const calcWeeksInMonth = (date) => {
  const first = date.day() === 0 ? 6 : date.day() - 1
  const day = 7 - first

  const last = date.daysInMonth()
  const count = parseInt((last - day) / 7, 10) + 1
  return count
}

export const generateMonth = (latestMonth) => {
  const months = []
  for (let index = latestMonth - 3; index <= latestMonth; index += 1) {
    months.push({
      index,
      month: moment()
        .months(index)
        .format('MMMM YYYY'),
      weeks: Array(calcWeeksInMonth(moment()
        .months(index)))
        .fill(0),
    })
  }
  return months
}

import * as utils from '..'

describe('getStartDate', () => {
  test('Jan', () => {
    const obj = {
      date: '15',
      month: '2019-01',
    }

    const actual = utils.getStartDate(obj.date, obj.month)
    expect(actual).toEqual('2019-01-15')
  })

  test('Jan', () => {
    const obj = {
      date: '60',
      month: '2019-01',
    }

    const actual = utils.getStartDate(obj.date, obj.month)
    expect(actual).toEqual('2019-01-31')
  })

  test('Jan', () => {
    const obj = {
      date: '31',
      month: '2019-01',
    }

    const actual = utils.getStartDate(obj.date, obj.month)
    expect(actual).toEqual('2019-01-31')
  })

  test('Feb', () => {
    const obj = {
      date: '60',
      month: '2019-02',
    }

    const actual = utils.getStartDate(obj.date, obj.month)
    expect(actual).toEqual('2019-02-28')
  })

  test('Feb2', () => {
    const obj = {
      date: '29',
      month: '2019-02',
    }

    const actual = utils.getStartDate(obj.date, obj.month)
    expect(actual).toEqual('2019-02-28')
  })

  test('March', () => {
    const obj = {
      date: '31',
      month: '2019-03',
    }

    const actual = utils.getStartDate(obj.date, obj.month)
    expect(actual).toEqual('2019-03-31')
  })

  test('April', () => {
    const obj = {
      date: '28',
      month: '2019-04',
    }

    const actual = utils.getStartDate(obj.date, obj.month)
    expect(actual).toEqual('2019-04-28')
  })

  test('April', () => {
    const obj = {
      date: '31',
      month: '2019-04',
    }

    const actual = utils.getStartDate(obj.date, obj.month)
    expect(actual).toEqual('2019-04-30')
  })

  test('Fox1', () => {
    const obj = {
      date: '29',
      month: '2019-02',
    }

    const actual = utils.getStartDate(obj.date, obj.month)
    expect(actual).toEqual('2019-02-28')
  })

  test('Fox2', () => {
    const obj = {
      date: '31',
      month: '2019-04',
    }

    const actual = utils.getStartDate(obj.date, obj.month)
    expect(actual).toEqual('2019-04-30')
  })

  test('Fox3', () => {
    const obj = {
      date: '31',
      month: '2019-04',
    }

    const actual = utils.getStartDate(obj.date, obj.month)
    expect(actual).toEqual('2019-04-30')
  })
})

describe('getEndDate', () => {
  test('Jan', () => {
    const start_date = '2019-01-15'
    const obj = { date: '15' }

    const actual = utils.getEndDate(start_date, obj.date)
    expect(actual).toEqual('2019-02-14')
  })

  test('Jan 2', () => {
    const start_date = '2019-01-31'
    const obj = { date: '31' }

    const actual = utils.getEndDate(start_date, obj.date)
    expect(actual).toEqual('2019-02-27')
  })

  test('March', () => {
    const start_date = '2019-03-31'
    const obj = { date: '31' }

    const actual = utils.getEndDate(start_date, obj.date)
    expect(actual).toEqual('2019-04-29')
  })

  test('April', () => {
    const start_date = '2019-04-30'
    const obj = { date: '30' }

    const actual = utils.getEndDate(start_date, obj.date)
    expect(actual).toEqual('2019-05-29')
  })

  test('Fox 2', () => {
    const start_date = '2019-01-29'
    const obj = { date: '29' }

    const actual = utils.getEndDate(start_date, obj.date)
    expect(actual).toEqual('2019-02-27')
  })

  test('Fox 3', () => {
    const start_date = '2019-02-28'
    const obj = { date: '29' }

    const actual = utils.getEndDate(start_date, obj.date)
    expect(actual).toEqual('2019-03-28')
  })

  test('Fox 1 LeapYear', () => {
    const start_date = '2012-01-19'
    const obj = { date: '29' }

    const actual = utils.getEndDate(start_date, obj.date)
    expect(actual).toEqual('2012-02-28')
  })

  test('Fox 2 LeapYear', () => {
    const start_date = '2013-01-29'
    const obj = { date: '29' }

    const actual = utils.getEndDate(start_date, obj.date)
    expect(actual).toEqual('2013-02-27')
  })

  test('Fox 3 LeapYear', () => {
    const start_date = '2012-01-29'
    const obj = { date: '28' }

    const actual = utils.getEndDate(start_date, obj.date)
    expect(actual).toEqual('2012-02-27')
  })

  test('Fox 4 LeapYear', () => {
    const start_date = '2012-01-31'
    const obj = { date: '31' }

    const actual = utils.getEndDate(start_date, obj.date)
    expect(actual).toEqual('2012-02-28')
  })

  test('Fox 5 LeapYear', () => {
    const start_date = '2013-01-31'
    const obj = { date: '31' }

    const actual = utils.getEndDate(start_date, obj.date)
    expect(actual).toEqual('2013-02-27')
  })
})

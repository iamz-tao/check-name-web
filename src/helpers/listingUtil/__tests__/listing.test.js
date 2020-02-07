import * as utils from '..'

describe('Total Page Util', () => {
  test('Calculate Total Page', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const page = 2
    const item_per_page = 5
    const actual = utils.calculatePagination({ data, page, item_per_page })
    const expectData = {
      item_per_page,
      page,
      total_pages: 2,
    }

    expect(actual).toEqual(expectData)
  })

  test('Calculate Total Page 2', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const page = 2
    const item_per_page = 5
    const actual = utils.calculatePagination({ data, page, item_per_page })
    const expectData = {
      item_per_page,
      page,
      total_pages: 3,
    }

    expect(actual).toEqual(expectData)
  })

  test('Calculate Total Page 3', () => {
    const data = []
    const page = 2
    const item_per_page = 5
    const actual = utils.calculatePagination({ data, page, item_per_page })
    const expectData = {
      item_per_page,
      page,
      total_pages: 1,
    }

    expect(actual).toEqual(expectData)
  })

  test('Calculate Total Page 4', () => {
    const data = {}
    const page = 2
    const item_per_page = 5
    const actual = utils.calculatePagination({ data, page, item_per_page })
    const expectData = {
      item_per_page,
      page,
      total_pages: 1,
    }

    expect(actual).toEqual(expectData)
  })
})

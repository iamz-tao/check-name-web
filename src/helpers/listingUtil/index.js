const is_js = require('is_js')

export const calculatePagination = ({ data = [], page = 1, item_per_page = 10 }) => {
  try {
    const total_pages = Math.floor(data.length / item_per_page) + 1

    if (is_js.not.number(total_pages)) {
      throw new Error('value is not number')
    }

    return {
      total_pages,
      page,
      item_per_page,
    }
  } catch (e) {
    return {
      page,
      item_per_page,
      total_pages: 1,
    }
  }
}

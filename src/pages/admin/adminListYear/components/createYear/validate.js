import set from 'lodash/set'

const validate = (values) => {
  const errors = {}

  if (values.get('year') === undefined) {
    set(errors, 'year', 'Required')
  }

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(values.get('year'))) {
    errors.year = 'Invalid year!'
  }
  // eslint-disable-next-line no-bitwise
  if (~~values.get('year') > new Date().getFullYear() - 543) {
    errors.year = 'No more than the current year.'
  }

  if (values.get('semester') === undefined) {
    set(errors, 'semester', 'Required')
  }

  return errors
}
export default validate

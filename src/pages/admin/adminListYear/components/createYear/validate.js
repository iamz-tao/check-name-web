import set from 'lodash/set'

const validate = (values) => {
  const errors = {}

  if (values.get('year') === undefined ) {
    set(errors, 'year', 'Required')
  }
  if (isNaN(values.get('year'))) {
    errors.year = 'Invalid year!'
  }

  if (values.get('semester') === undefined) {
    set(errors, 'semester', 'Required')
  }

  return errors
}
export default validate

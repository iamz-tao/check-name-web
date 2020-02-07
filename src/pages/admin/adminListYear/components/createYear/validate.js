import set from 'lodash/set'

const validate = (values) => {
  const errors = {}

  if (values.size === 0) {
    set(errors, '', 'Required')
  }
  if (!values.get('semester')) {
    set(errors, 'semester', 'Required')
  }
  if (!values.get('year')) {
    set(errors, 'year', 'Required')
  }

  return errors
}
export default validate

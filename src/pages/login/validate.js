import is from 'is_js'

const validate = (values) => {
  const errors = {}

  if (!values.get('email')) {
    errors.email = 'Required!'
  }

  if (values.get('email') && !is.email(values.get('email'))) {
    errors.email = 'Invalid email address!'
  }

  if (!values.get('password')) {
    errors.password = 'Required!'
  }

  return errors
}
export default validate

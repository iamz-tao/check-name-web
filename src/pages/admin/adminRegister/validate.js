import is from 'is_js'

const validate = (values) => {
  const errors = {}

  if (!values.get('email')) {
    errors.email = 'This field is required!'
  }

  if (values.get('email') && !is.email(values.get('email'))) {
    errors.email = 'Invalid email address!'
  }

  if (!values.get('professor_id')) {
    errors.professor_id = 'This field is required!'
  }

  if (!values.get('password')) {
    errors.password = 'This field is required!'
  }

  if (!values.get('mobile_phone')) {
    errors.mobile_phone = 'This field is required!'
  }

  if (values.get('mobile_phone') && !is.nanpPhone(values.get('mobile_phone'))) {
    errors.mobile_phone = 'Invalid phone number!'
  }

  return errors
}
export default validate

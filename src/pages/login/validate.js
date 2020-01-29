import is from 'is_js'

const validate = (values) => {
  const errors = {}

  if (!values.get('email')) {
    errors.email = 'กรุณากรอกข้อมูล'
  }

  if (values.get('email') && !is.email(values.get('email'))) {
    errors.email = 'กรุณากรอกให้ถูกต้อง'
  }

  if (!values.get('password')) {
    errors.password = 'กรุณากรอกข้อมูล'
  }

  return errors
}
export default validate

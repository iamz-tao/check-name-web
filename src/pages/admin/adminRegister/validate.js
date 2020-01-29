import is from 'is_js'
import set from 'lodash/set'

const validate = (values) => {
  const errors = {}

  if (!values.get('professor_id')) {
    set(errors, 'professor_id','This field is required.') 
  }

  if (values.get('name')) {
    set(errors, 'name', 'This field is required.')
  }

  if (!values.get('surname')) {
    set(errors,'surname' , 'This field is required.')
  }

  if (!values.get('mobile_phone') || !is.nanpPhone(values.get('mobile_phone'))) {
    set(errors,'mobile_phone', 'This field is required.')
  }

  if (values.get('email') && !is.email(values.get('email'))) {
    set(errors,'email' , 'This field is required or email invalid.')
  }

  if (!values.get('password')) {
    set(errors,'password','This field is required.')
  }

  return errors
}
export default validate

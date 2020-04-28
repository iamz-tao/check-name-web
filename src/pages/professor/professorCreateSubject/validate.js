import set from 'lodash/set'

const validate = (values) => {
  const errors = {}

  if (values.get('subject_code') === undefined ) {
    set(errors, 'subject_code', 'Required')
  }
  if (isNaN(values.get('subject_code'))) {
    errors.subject_code = 'Invalid subject_code!'
  }

  if (values.get('subject_name') === undefined) {
    set(errors, 'subject_name', 'Required')
  }

  return errors
}
export default validate

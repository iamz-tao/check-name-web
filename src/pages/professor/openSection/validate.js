import set from 'lodash/set'

const validate = (values) => {
  const errors = {}

  if (values.size === 0) {
    set(errors, '', 'Required')
  }
  if (!values.get('late_time')) {
    set(errors, 'late_time', 'Required')
  }
  if (!values.get('absent_time')) {
    set(errors, 'absent_time', 'Required')
  }
  if (!values.get('total_mark')) {
    set(errors, 'total_mark', 'Required')
  }
  if (!values.get('section_number')) {
    set(errors, 'total_mark', 'Required')
  }

  return errors
}
export default validate

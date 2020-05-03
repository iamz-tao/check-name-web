import set from 'lodash/set'

const validate = (values) => {
  const errors = {}

  if (values.get('late_time') === undefined) {
    set(errors, 'late_time', 'Required')
  }
  if (values.get('absent_time') === undefined) {
    set(errors, 'absent_time', 'Required')
  }
  if (values.get('total_mark') === undefined) {
    set(errors, 'total_mark', 'Required')
  }
  if (values.get('section_number') === undefined) {
    set(errors, 'total_mark', 'Required')
  }

  if (isNaN(values.get('section_number'))) {
    errors.section_number = 'Invalid section number!'
  }
  if (isNaN(values.get('total_mark'))) {
    errors.total_mark = 'Invalid total mark!'
  }
  if (isNaN(values.get('absent_time'))) {
    errors.absent_time = 'Invalid absent time!'
  }
  if (isNaN(values.get('late_time'))) {
    errors.late_time = 'Invalid late time!'
  }

  return errors
}
export default validate

import capitalize from 'lodash/capitalize'
import { USER_ROLES } from '~/modules/app/constants'

export const getUserRoleName = role => capitalize(USER_ROLES[role] || '')

export const getNameWithEmail = (email) => {
  if (email !== '') {
    const emailSplitted = email.split('@')

    return emailSplitted[0]
  }

  return email
}

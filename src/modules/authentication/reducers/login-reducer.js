import { fromJS } from 'immutable'
import isNil from 'lodash/isNil'
import Cookie from 'js-cookie'

import {
  LOGIN_WITH_USERNAME_REQUEST,
  LOGIN_WITH_USERNAME_SUCCESS,
  LOGIN_WITH_USERNAME_FAILURE,
  LOGIN_CLOSE_MODAL,
  LOGOUT_USER,
} from '../constants'

const initialState = fromJS({
  isFetching: false,
  isAuthenticated: !isNil(Cookie.get('token')),
  token: Cookie.get('token') || '',
})
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_WITH_USERNAME_REQUEST:
      return state
        .set('isFetching', true)
    case LOGIN_WITH_USERNAME_SUCCESS: {
      Cookie.set('token', payload.token)
      Cookie.set('email', payload.email)
      Cookie.set('role', payload.role)
      Cookie.set('name', payload.name)
      return state
        .set('isFetching', false)
        .set('isAuthenticated', true)
        .set('status', 200)
        .set('token', payload.token)
    }
    case LOGIN_WITH_USERNAME_FAILURE:
      return state
        .set('isFetching', false)
        .set('status', 400)
        .set('errorMessage', payload.errorMessage)
    case LOGIN_CLOSE_MODAL:
      return state
        .remove('status')
        .remove('errorMessage')
    case LOGOUT_USER:
      Cookie.remove('token')
      Cookie.remove('email')
      Cookie.remove('role')
      Cookie.remove('standin')
      Cookie.remove('name')
      return state
        .clear()
        .set('isFetching', false)
        .set('isAuthenticated', false)
        .set('token', '')
    default:
      return state
  }
}

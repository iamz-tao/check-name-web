import { fromJS } from 'immutable'
import Cookie from 'js-cookie'

import {
  GET_USER_PROFILE_WITH_TOKEN_SUCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE,
  CLEAR_HTTP,
  LOGOUT,
  RESET_PROFILE,
} from '../constants'

const initialState = fromJS({
  profile: null,
  httpState: {
    isFetching: false,
    message: '',
  },
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_PROFILE_WITH_TOKEN_SUCCESS:
      return state.set('profile', fromJS(payload))
    case UPDATE_USER_PROFILE:
      return state
        .setIn(['httpState', 'isFetching'], true)
    case UPDATE_USER_PROFILE_SUCCESS:
      return state
        .setIn(['profile', 'profile'], fromJS(payload.profile))
        .setIn(['httpState', 'isFetching'], false)
    case CLEAR_HTTP:
      return state
        .setIn(['httpState', 'isFetching'], false)
        .setIn(['httpState', 'message'], '')
    case LOGOUT:
      Cookie.remove('token')
      Cookie.remove('email')
      return state
        .set('profile', null)
    case RESET_PROFILE:
      return state
        .set('profile', null)
    default:
      return state
  }
}

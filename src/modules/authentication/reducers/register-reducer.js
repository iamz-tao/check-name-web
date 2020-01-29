import { fromJS } from 'immutable'
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_RESET,
  REGISTER_ADMIN_SUCCESS,
} from '../constants'

const initialState = fromJS({
  isFetching: false,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER_REQUEST:
      return state
        .set('isFetching', true)
    case REGISTER_USER_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('status', 200)
        .set('payload', payload)
    }
    case REGISTER_ADMIN_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('status', 200)
        .set('payload', payload)
    }
    case REGISTER_USER_FAILURE: {
      return state
        .set('isFetching', false)
        .set('status', 400)
        .set('payload', payload)
    }
    case REGISTER_USER_RESET:
      return state
        .clear()
        .set('isFetching', false)
    default:
      return state
  }
}

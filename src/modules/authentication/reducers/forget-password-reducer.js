import { fromJS } from 'immutable'
import {
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  CLEAR_FORGET_PASSWORD,
} from '../constants'

const initialState = fromJS({
  isFetching: false,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FORGET_PASSWORD_REQUEST:
      return state
        .set('isFetching', true)
    case FORGET_PASSWORD_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('status', 200)
        .set('payload', payload)
    }
    case CLEAR_FORGET_PASSWORD:
      return state
        .clear()
        .set('isFetching', false)
    default:
      return state
  }
}

import { fromJS } from 'immutable'
import {
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  CLEAR_SET_PASSWORD,
  SET_PASSWORD_FAILURE,
} from '../constants'

const initialState = fromJS({
  isFetching: false,
  isSuccessModal: false,
  isErrorModal: false,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PASSWORD_REQUEST:
      return state
        .set('isFetching', true)
    case SET_PASSWORD_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('isSuccessModal', true)
        .set('status', payload)
    }
    case SET_PASSWORD_FAILURE: {
      return state
        .set('isFetching', false)
        .set('isErrorModal', true)
        .set('status', 400)
        .set('errorMessage', payload.errorMessage)
    }
    case CLEAR_SET_PASSWORD:
      return state
        .clear()
        .set('isSuccessModal', false)
        .set('isFetching', false)
    default:
      return state
  }
}

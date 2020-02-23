import { fromJS } from 'immutable'
import {
  SET_TO_USERS,
  REQUEST_SUCCESS,
  DELETE_USER_SUCCESS,
} from '../constants'

const initialState = fromJS({
  users: null,
  user: null,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TO_USERS: {
      return state
        .set('users', fromJS(payload))
    }
    case REQUEST_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('errorMessage', payload.message)
    }
    case DELETE_USER_SUCCESS: {
      const userIndex = state.get('users').findIndex(rec => rec.get('uid') === payload)
      return state
      .removeIn(['users', userIndex])
      .set('isFetching', false)
    }
    default:
      return state
  }
}

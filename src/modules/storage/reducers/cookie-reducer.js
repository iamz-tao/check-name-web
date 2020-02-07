import { fromJS } from 'immutable'

import {
  SET_COOKIE,
  REMOVE_COOKIE,
} from '../constants'

const initialState = fromJS({})

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_COOKIE:
      return state.set(action.payload.key, action.payload.value)
    case REMOVE_COOKIE:
      return state.delete(action.payload.key)
    default:
      return state
  }
}

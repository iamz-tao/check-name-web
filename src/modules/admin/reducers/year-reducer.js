import { fromJS } from 'immutable'
import {
  CREATE_YEAR_SUCCESS,
  CREATE_YEAR_FAILED,
  SET_TO_YEAR,
} from '../constants'

const initialState = fromJS({
  yearAll: null,
  year: null,
  httpState: {
    isFetching: false,
    message: '',
  },
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_YEAR_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('errorMessage', payload.message)
    }
    case CREATE_YEAR_FAILED: {
    return state
        .set('isFetching', false)
        .set('status', 400)
        .set('payload', payload)
    }
    case SET_TO_YEAR:
      return state
        .set('yearAll', fromJS(payload))
        .setIn(['httpState', 'isFetching'], true)
    default:
      return state
  }
}

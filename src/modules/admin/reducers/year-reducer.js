import { fromJS } from 'immutable'
import {
  CREATE_YEAR_SUCCESS,
  CREATE_YEAR_FAILED,
} from '../constants'

const initialState = fromJS({
  yearAll: null,
  year: null,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_YEAR_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('errorMessage', payload.message)
    }
    case CREATE_YEAR_FAILED : {
    return state
        .set('isFetching', false)
        .set('status', 400)
        .set('payload', payload)
    }
    default:
      return state
  }
}

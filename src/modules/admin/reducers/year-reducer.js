import { fromJS } from 'immutable'
import {
  CREATE_YEAR_SUCCESS,
  CREATE_YEAR_FAILED,
  SET_TO_YEAR,
  UPDATE_CURRENT_YEAR_SUCCESS,
  SET_CURRENT_YEAR,
  DELETE_YEAR_SUCCESS,
} from '../constants'
import { CLEAR_HTTP } from '~/modules/user/constants'

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
    case UPDATE_CURRENT_YEAR_SUCCESS: {
      const id = payload
      const yearIndex = state.getIn(['yearAll'])
        .findIndex(rec => rec.get('id') === id)
      const yearActivePreviousIndex = state.getIn(['yearAll'])
        .findIndex(rec => rec.get('status') === 'ACTIVE')
      const status = state.getIn(['yearAll', yearIndex, 'status'])
      return state
        .setIn(['yearAll', yearIndex, 'status'], status === 'ACTIVE' ? 'DISABLE' : status === 'DISABLE' && 'ACTIVE')
        .setIn(['yearAll', yearActivePreviousIndex, 'status'], 'DISABLE')
    }
    case SET_CURRENT_YEAR:
      return state
        .set('year', fromJS(payload))
        .setIn(['httpState', 'isFetching'], true)
    case DELETE_YEAR_SUCCESS: {
      const index = state.getIn(['yearAll'])
        .findIndex(rec => rec.get('id') === payload)
      return state
        .removeIn(['yearAll', index])
        .setIn(['httpState', 'isFetching'], true)
    }
    default:
      return state
  }
}

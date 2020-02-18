import { fromJS } from 'immutable'
import {
  SET_TO_BEACON,
  DELETE_TO_BEACON,
} from '../constants'

const initialState = fromJS({
  beacons: null,
  httpState: {
    isFetching: false,
    message: '',
  },
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TO_BEACON:
      return state
        .set('beacons', fromJS(payload))
        .setIn(['httpState', 'isFetching'], true)
    case DELETE_TO_BEACON: {
      const index = state.getIn(['beacons'])
        .findIndex(rec => rec.get('id') === payload)
      return state
        .removeIn(['beacons', index])
        .setIn(['httpState', 'isFetching'], true)
    }
    default:
      return state
  }
}

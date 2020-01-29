import { fromJS } from 'immutable'
import {
  LOADING_IMAGE,
} from '../constants'

const initialState = fromJS({
  isLoading: false,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_IMAGE:
      return state.setIn(['isLoading'], payload.isLoading)
    default:
      return state
  }
}

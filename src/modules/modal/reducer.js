import { fromJS } from 'immutable'

import {
  SET_MODAL,
} from './constants'

const initialState = fromJS({
  status: false,
  content: {
    title: '',
    detail: '',
  },
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MODAL:
      return state
        .set('status', payload)
        // .set('content',fromJS(content[payload] || []))
    default:
      return state
  }
}

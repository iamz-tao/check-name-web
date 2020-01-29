import { fromJS } from 'immutable'

import {
  SET_LOCALE,
} from './constants'

const initialState = fromJS({
  lang: 'en',
  messages: {},
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOCALE:
      return state
        .set('lang', payload.lang)
        .set('messages', fromJS(payload.messages))
    default:
      return state
  }
}

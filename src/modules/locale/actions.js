import {
  SET_LOCALE,
  SET_MESSAGE,
  FETCH_MESSAGE,
} from './constants'

module.exports = {
  setLocale: payload => ({
    payload,
    type: SET_LOCALE,
  }),

  setMessage: payload => ({
    payload,
    type: SET_MESSAGE,
  }),

  fetchMessage: payload => ({
    payload,
    type: FETCH_MESSAGE,
  }),
}

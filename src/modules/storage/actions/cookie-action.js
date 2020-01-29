import {
  SET_COOKIE,
  REMOVE_COOKIE,
} from '../constants'

export const setCookie = (key, value, options) => ({
  type: SET_COOKIE,
  payload: { key, value, options },
})

export const removeCookie = (key, options) => ({
  type: REMOVE_COOKIE,
  payload: { key, options },
})

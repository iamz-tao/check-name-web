import {
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  CLEAR_SET_PASSWORD,
  SET_PASSWORD_FAILURE,
} from '../constants'

export const setPassword = payload => ({
  payload,
  type: SET_PASSWORD_REQUEST,
})

export const setPasswordSuccess = payload => ({
  payload,
  type: SET_PASSWORD_SUCCESS,
})

export const clearSetPassword = payload => ({
  payload,
  type: CLEAR_SET_PASSWORD,
})

export const setPasswordFailure = payload => ({
  payload,
  type: SET_PASSWORD_FAILURE,
})

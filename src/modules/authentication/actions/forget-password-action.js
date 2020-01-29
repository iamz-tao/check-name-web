import {
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  CLEAR_FORGET_PASSWORD,
} from '../constants'

export const forgetPassword = payload => ({
  payload,
  type: FORGET_PASSWORD_REQUEST,
})

export const forgetPasswordSuccess = payload => ({
  payload,
  type: FORGET_PASSWORD_SUCCESS,
})

export const clearForgetPassword = payload => ({
  payload,
  type: CLEAR_FORGET_PASSWORD,
})

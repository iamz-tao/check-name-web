import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_RESET,
  REGISTER_ADMIN_SUCCESS,
} from '../constants'

export const registerUser = payload => ({
  payload,
  type: REGISTER_USER_REQUEST,
})

export const registerUserSuccess = payload => ({
  type: REGISTER_USER_SUCCESS,
  payload,
})

export const registerAdminSuccess = payload => ({
  type: REGISTER_ADMIN_SUCCESS,
  payload,
})
export const registerUserFailure = payload => ({
  type: REGISTER_USER_FAILURE,
  payload,
})

export const registerUserReset = () => ({
  type: REGISTER_USER_RESET,
})

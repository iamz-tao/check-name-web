import {
  LOGIN_WITH_USERNAME_REQUEST,
  LOGIN_WITH_USERNAME_SUCCESS,
  LOGIN_WITH_USERNAME_FAILURE,
  LOGIN_CLOSE_MODAL,
  LOGOUT_USER,
  CONFIRM_EMAIL_WITH_TOKEN,
  CONFIRM_EMAIL_WITH_TOKEN_SUCCESS,
  CONFIRM_EMAIL_WITH_TOKEN_FAILURE,
  HANDLE_ALREADY_LOGIN,
} from '../constants'

export const loginWithUsername = payload => ({
  payload,
  type: LOGIN_WITH_USERNAME_REQUEST,
})

export const loginWithUsernameSuccess = payload => ({
  type: LOGIN_WITH_USERNAME_SUCCESS,
  payload,
})

export const loginWithUsernameFailure = payload => ({
  type: LOGIN_WITH_USERNAME_FAILURE,
  payload,
})

export const LoginCloseModal = payload => ({
  payload,
  type: LOGIN_CLOSE_MODAL,
})

export const handleLogout = payload => ({
  payload,
  type: LOGOUT_USER,
})

export const confirmEmailWithToken = payload => ({
  payload,
  type: CONFIRM_EMAIL_WITH_TOKEN,
})

export const confirmEmailWithTokenSuccess = payload => ({
  type: CONFIRM_EMAIL_WITH_TOKEN_SUCCESS,
  payload,
})

export const confirmEmailWithTokenFailure = payload => ({
  type: CONFIRM_EMAIL_WITH_TOKEN_FAILURE,
  payload,
})

export const handleAlreadyLogin = payload => ({
  payload,
  type: HANDLE_ALREADY_LOGIN,
})

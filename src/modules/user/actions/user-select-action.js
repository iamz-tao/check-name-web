import {
  GET_USER_PROFILE_WITH_TOKEN,
  GET_USER_PROFILE_WITH_TOKEN_SUCCESS,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  CLEAR_HTTP,
  LOGOUT,
  RESET_PROFILE,
} from '../constants'

export const getUserProfileWithToken = payload => ({
  payload,
  type: GET_USER_PROFILE_WITH_TOKEN,
})

export const getProfileWithTokenSuccess = payload => ({
  payload,
  type: GET_USER_PROFILE_WITH_TOKEN_SUCCESS,
})

export const updateUserProfile = payload => ({
  payload,
  type: UPDATE_USER_PROFILE,
})

export const updateProfileWithTokenSuccess = payload => ({
  payload,
  type: UPDATE_USER_PROFILE_SUCCESS,
})

export const clearUserHttpRequest = payload => ({
  payload,
  type: CLEAR_HTTP,
})

export const logout = payload => ({
  payload,
  type: LOGOUT,
})

export const resetProfile = payload => ({
  payload,
  type: RESET_PROFILE,
})

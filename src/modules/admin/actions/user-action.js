import {
  GET_USERS,
  SET_TO_USERS,
  GET_USER,
  SET_TO_USER,
  DELETE_USER,
  REQUEST_SUCCESS,
} from '../constants'

export const getUsers = payload => ({
  payload,
  type: GET_USERS,
})

export const setToUsers = payload => ({
  payload,
  type: SET_TO_USERS,
})

export const getUser = payload => ({
  payload,
  type: GET_USER,
})

export const deleteUser = payload => ({
  payload,
  type: DELETE_USER,
})

export const setToUser = payload => ({
  payload,
  type: SET_TO_USER,
})

export const requestSuccess = (payload = { message: '' }) => ({
  payload,
  type: REQUEST_SUCCESS,
})
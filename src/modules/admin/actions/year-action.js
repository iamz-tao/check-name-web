import {
  CREATE_YEAR,
  CREATE_YEAR_SUCCESS,
  CREATE_YEAR_FAILED,
  GET_YEAR_ALL,
  SET_TO_YEAR,
} from '../constants'

export const createYear = payload => ({
  payload,
  type: CREATE_YEAR,
})

export const createYearSuccess = payload => ({
  payload,
  type: CREATE_YEAR_SUCCESS,
})

export const createYearFailure = payload => ({
  payload,
  type: CREATE_YEAR_FAILED,
})

export const getYearAll = payload => ({
  payload,
  type: GET_YEAR_ALL,
})

export const setToYear = payload => ({
  payload,
  type: SET_TO_YEAR,
})
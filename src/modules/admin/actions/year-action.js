import {
  CREATE_YEAR,
  CREATE_YEAR_SUCCESS,
  CREATE_YEAR_FAILED,
  GET_YEAR_ALL,
  SET_TO_YEAR,
  DELETE_YEAR,
  DELETE_YEAR_SUCCESS,
  UPDATE_CURRENT_YEAR,
  UPDATE_CURRENT_YEAR_SUCCESS,
  GET_CURRENT_YEAR,
  SET_CURRENT_YEAR,
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

export const deleteYear = payload => ({
  payload,
  type: DELETE_YEAR,
})

export const deleteYearSuccess = payload => ({
  payload,
  type: DELETE_YEAR_SUCCESS,
})

export const updateCurrentYear = payload => ({
  payload,
  type: UPDATE_CURRENT_YEAR,
})


export const updateCurrentYearSuccess = payload => ({
  payload,
  type: UPDATE_CURRENT_YEAR_SUCCESS,
})

export const getCurrentYear = payload => ({
  payload,
  type: GET_CURRENT_YEAR,
})

export const setCurrentYear = payload => ({
  payload,
  type: SET_CURRENT_YEAR,
})

import {
  CREATE_YEAR,
  CREATE_YEAR_SUCCESS,
  CREATE_YEAR_FAILED,
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

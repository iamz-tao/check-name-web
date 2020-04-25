import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'
import Router from 'next/router'
import isNil from 'lodash/isNil'

import { yearAction } from '../actions'
import {
  CREATE_YEAR,
  GET_YEAR_ALL,
  DELETE_YEAR,
  UPDATE_CURRENT_YEAR,
  GET_CURRENT_YEAR,
} from '../constants'
import { getYearAllAPI, deleteYearAPI, getCurrentYearAPI } from '../api'

import * as httpToken from '~/helpers/axiosWrapperPostToken'
import * as httpPut from '~/helpers/axiosWrapperPut'

export function* createYear({ payload }) {
  try {
    const {
      year,
      semester,
    } = payload.data

    const response = yield call(httpToken.post, {
      url: '/api/AddYear',
      payload: {
        year,
        semester,
      },
    })

    const { error } = response
    if (error) {
      yield put(yearAction.createYearFailure({ message: response.message || 'Error has been occured' }))
      return
    }
    // yield put(yearAction.createYearSusscess(response.data))
    Router.replace('/list-year')
  } catch (exception) {
    yield put(yearAction.createYearFailure({ message: 'Internal Error' }))
  }
}

export function* getYearAll() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getYearAllAPI()
      if (error) {
        return
      }
      yield put(yearAction.setToYear(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* getCurrentYear() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getCurrentYearAPI()
      if (error) {
        return
      }
      yield put(yearAction.setCurrentYear(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* deleteYear({ payload }) {
  try {
    yield deleteYearAPI(payload.id)
  } catch (error) {
    console.log('error', error)
  }
}

export function* updateCurrentYear({ payload }) {
  try {
    const response = yield call(httpPut.post, {
      url: `/api/setCurrentYear/${payload.id}`,
    })

    const { error } = response
    if (error) {
      return
    }

    yield put(yearAction.updateCurrentYearSuccess(payload.id))
  } catch (error) {
    console.log('error', error)
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(CREATE_YEAR, createYear),
    takeLatest(GET_YEAR_ALL, getYearAll),
    takeLatest(GET_CURRENT_YEAR, getCurrentYear),
    takeLatest(DELETE_YEAR, deleteYear),
    takeLatest(UPDATE_CURRENT_YEAR, updateCurrentYear),
  ])
}

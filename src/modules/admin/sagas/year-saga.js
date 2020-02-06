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
} from '../constants'
import { getYearAllAPI } from '../api'

import * as httpToken from '~/helpers/axiosWrapperPostToken'
import * as http from '~/helpers/axiosWrapper'

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
export default function* authSaga() {
  yield all([
    takeLatest(CREATE_YEAR, createYear),
    takeLatest(GET_YEAR_ALL, getYearAll),
  ])
}

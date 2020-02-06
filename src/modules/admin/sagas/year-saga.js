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
} from '../constants'

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


export default function* authSaga() {
  yield all([
    takeLatest(CREATE_YEAR, createYear),
  ])
}

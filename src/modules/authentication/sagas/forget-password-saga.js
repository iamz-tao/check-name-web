import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

import * as http from '~/helpers/axiosWrapper'

import { forgetPasswordAction } from '../actions'

import {
  FORGET_PASSWORD_REQUEST,
} from '../constants'

export function* forgetPasswordRequest({ payload }) {
  try {
    const { email, url } = payload
    const operation = 'forget_password'
    const resp = yield call(http.post, {
      url: '/api',
      payload: {
        operation,
        email,
        data: { url },
      },
    })

    if (resp.error) {
      return
    }

    yield put(forgetPasswordAction.forgetPasswordSuccess())
  } catch (error) {
    console.log('errrrr', error)
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(FORGET_PASSWORD_REQUEST, forgetPasswordRequest),
  ])
}

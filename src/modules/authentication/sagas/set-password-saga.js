import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

import * as http from '~/helpers/axiosWrapper'

import { setPasswordAction } from '../actions'
import {
  SET_PASSWORD_REQUEST,
} from '../constants'

export function* setPasswordRequest({ payload }) {
  try {
    const operation = 'reset_password'
    const { email, ...data } = payload.data
    const resp = yield call(http.post, {
      url: '/api',
      payload: {
        email,
        operation,
        data,
      },
    })

    if (resp.error) {
      yield put(setPasswordAction.setPasswordFailure({ errorMessage: resp || 'Error has been occured' }))
      return
    }

    yield put(setPasswordAction.setPasswordSuccess())
  } catch (error) {
    yield put(setPasswordAction.setPasswordFailure({ errorMessage: 'Error has been occured' }))
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(SET_PASSWORD_REQUEST, setPasswordRequest),
  ])
}

import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
// import Router from 'next/router'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'

import * as http from '~/helpers/axiosWrapper'

import { registerAction } from '../actions'
import { 
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_ADMIN_SUCCESS,
 } from '../constants'

export function* registerUserRequest({ payload }) {
  try {
    const token = Cookie.get('token', '')
    const {
      email,
      mobile,
      password,
      firstname,
      lastname,
      role,
      id,
    } = payload.data
    
    const response = yield call(http.post, {
      url: '/api/register',
      payload: {
        email,
        mobile,
        password,
        firstname,
        lastname,
        role,
        id,
      },
    })

    const { error } = response
    if (error) {
      yield put(registerAction.registerUserFailure({ message: response.message || 'Error has been occured' }))
      return
    }
    if (token === undefined) {
      yield put(registerAction.registerUserSuccess(response))
    } else {
      yield put(registerAction.registerAdminSuccess(response))
    }
  } catch (exception) {
    yield put(registerAction.registerUserFailure({ message: 'Internal Error' }))
  }
}

export function* registerUserSuccess() {
  try {
    yield put(registerAction.registerUserReset())
      window.location.href = '/login'
  } catch (exception) {
    yield put(registerAction.registerUserFailure({ errorMessage: 'Internal Error' }))
  }
}

export function* registerAdminSuccess() {
  try {
    yield put(registerAction.registerUserReset())
      window.location.href = '/admin'
  } catch (exception) {
    yield put(registerAction.registerUserFailure({ errorMessage: 'Internal Error' }))
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(REGISTER_USER_REQUEST, registerUserRequest),
    takeEvery(REGISTER_USER_SUCCESS, registerUserSuccess),
    takeEvery(REGISTER_ADMIN_SUCCESS,registerAdminSuccess),
  ])
}

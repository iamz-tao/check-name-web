import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import Cookies from 'js-cookie'

import * as http from '~/helpers/axiosWrapper'
import { loginAction } from '../actions'
import {
  LOGIN_WITH_USERNAME_REQUEST,
  HANDLE_ALREADY_LOGIN,
} from '../constants'

const alreadyLogin = (role) => {
  let redirectUrl = ' '

  if (role === 'PROFESSOR') {
    redirectUrl = '/professor'
  }

  if (role === 'ADMIN') {
    redirectUrl = `/admin`
  }

  window.location.href = redirectUrl
}


export function* loginWithUsernameRequest({ payload }) {
  try {
    const { email, password } = payload.data
    const resp = yield call(http.post, {
      url: '/api/login',
      method: 'post',
      payload: {
        email,
        password,
      },
    })

    if (resp.error) {
      yield put(loginAction.loginWithUsernameFailure({ errorMessage: resp.message || 'Error has been occured' }))
      return
    }

    yield put(loginAction.loginWithUsernameSuccess({
      token: resp.data.data.token,
      email,
      role: resp.data.data.user.role,
      name: resp.data.data.user.displayName,
    }))
    alreadyLogin(resp.data.data.user.role)
  } catch (error) {
    yield put(loginAction.loginWithUsernameFailure({ errorMessage: 'Error has been occured' }))
  }
}

export function handleAlreadyLogin() {
  try {
    const role = Cookies.get('role')
    alreadyLogin(role)
  } catch (error) {
    console.log(error)
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(LOGIN_WITH_USERNAME_REQUEST, loginWithUsernameRequest),
    // takeLatest(CONFIRM_EMAIL_WITH_TOKEN, confirmEmailWithToken),
    takeLatest(HANDLE_ALREADY_LOGIN, handleAlreadyLogin),
  ])
}

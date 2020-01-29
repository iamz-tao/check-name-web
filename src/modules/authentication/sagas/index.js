import { call } from 'redux-saga/effects'
import registerSaga from './register-saga'
import authSaga from './auth-saga'
import forgetPasswordSaga from './forget-password-saga'
import setPasswordSaga from './set-password-saga'

export default [
  call(registerSaga),
  call(authSaga),
  call(forgetPasswordSaga),
  call(setPasswordSaga),
]

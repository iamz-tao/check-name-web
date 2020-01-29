import { call } from 'redux-saga/effects'
import cookieSaga from './cookie-saga'

export default [
  call(cookieSaga),
]

import { call } from 'redux-saga/effects'
import userSaga from './user-saga'

export default [
  call(userSaga),
]

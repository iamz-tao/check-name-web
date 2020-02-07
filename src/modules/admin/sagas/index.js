import { call } from 'redux-saga/effects'
import userSaga from './user-saga'
import yearSaga from './year-saga'

export default [
  call(userSaga),
  call(yearSaga),
]

import { call } from 'redux-saga/effects'
import subjectSaga from './subject-saga'

export default [
  call(subjectSaga),
]

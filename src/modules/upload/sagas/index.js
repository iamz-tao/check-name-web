import { call } from 'redux-saga/effects'
import uploadSaga from './upload-saga'

export default [
  call(uploadSaga),
]

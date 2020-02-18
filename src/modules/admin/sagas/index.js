import { call } from 'redux-saga/effects'
import userSaga from './user-saga'
import yearSaga from './year-saga'
import beaconSaga from './beacon-saga'

export default [
  call(userSaga),
  call(yearSaga),
  call(beaconSaga),
]

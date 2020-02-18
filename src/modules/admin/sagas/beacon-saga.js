import {
  all,
  put,
  takeLatest,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'

import { beaconAction } from '../actions'
import {
  GET_BEACON_ALL,
  DELETE_BEACON,
} from '../constants'
import { getBeaconAllAPI, deleteBeaconAPI } from '../api'


export function* getBeaconAll() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getBeaconAllAPI()
      if (error) {
        return
      }
      yield put(beaconAction.setToBeacon(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}


export function* deleteBeacon({ payload }) {
  try {
    yield deleteBeaconAPI(payload.id)
    yield put(beaconAction.delelteToBeacon(payload.id))
  } catch (error) {
    console.log('error', error)
  }
}


export default function* authSaga() {
  yield all([
    takeLatest(GET_BEACON_ALL, getBeaconAll),
    takeLatest(DELETE_BEACON, deleteBeacon),
  ])
}

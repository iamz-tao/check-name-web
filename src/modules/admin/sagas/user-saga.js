import {
  all,
  put,
  takeLatest,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'

import {
  GET_USERS,
  DELETE_USER,
} from '../constants'
import { userAction } from '../actions'
import { getUserAPI, deleteUserAPI } from '../api'

export function* getUsers() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getUserAPI()
      if (error) {
        return
      }
      yield put(userAction.setToUsers(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* deleteUser({ payload }) {
  try {
    yield deleteUserAPI(payload.id)
  } catch (error) {
    console.log('error', error)
  }
}


export default function* userSaga() {
  yield all([
    takeLatest(GET_USERS, getUsers),
    takeLatest(DELETE_USER, deleteUser),
  ])
}

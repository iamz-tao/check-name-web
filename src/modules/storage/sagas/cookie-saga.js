import { all, call, takeEvery } from 'redux-saga/effects'
import Cookie from 'js-cookie'

import {
  SET_COOKIE,
  REMOVE_COOKIE,
} from '../constants'

export function* setCookie(action) {
  const { key, value, options } = action.payload
  yield call(Cookie.set, key, value, options)
}

export function* removeCookie(action) {
  const { key, options } = action.payload
  yield call(Cookie.remove, key, options)
}

export default function* cookieSaga() {
  yield all([
    takeEvery(SET_COOKIE, setCookie),
    takeEvery(REMOVE_COOKIE, removeCookie),
  ])
}

import {
  call,
  put,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'
import Router from 'next/router'

import * as http from '~/helpers/axiosWrapperGet'
import * as httpDel from '~/helpers/axiosWrapperDelete'
import { loginAction } from '~/modules/authentication/actions'
import { userAction } from '../actions'

export function* getUserAPI() {
  const token = Cookie.get('token')
  const email = Cookie.get('email')
  const data = {}

  return yield call(http.post, {
    url: '/api/getUsers',
    payload: {
      token,
      email,
      data,
    },
  })
}

export function* getYearAllAPI() {
  const token = Cookie.get('token')
  const email = Cookie.get('email')
  const data = {}

  return yield call(http.post, {
    url: '/api/getYear',
    payload: {
      token,
      email,
      data,
    },
  })
}

export function* deleteUserAPI(id) {
  try {
    const token = Cookie.get('token')
    const email = Cookie.get('email')

    if (!isNil(token)) {
      const response = yield call(httpDel.post, {
        url: `/api/deleteUser/${id}`,
        payload: {
          email,
          token,
          data: {
            id,
          },
        },
      })

      window.location.href = '/admin'
      const { error } = response

      if (error) {
        yield put(loginAction.handleLogout())
        window.location.href = '/login'
        return
      }

      yield put(userAction.requestSuccess())
    } else {
      yield put(loginAction.handleLogout())
      window.location.href = '/login'
    }
  } catch (error) {
    console.log('error', error)
    yield put(userAction.requestSuccess())
  }
}

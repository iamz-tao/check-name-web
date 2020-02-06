import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'

import { loginAction } from '~/modules/authentication/actions'
import * as http from '~/helpers/axiosWrapperGet'
import * as httpPut from '~/helpers/axiosWrapperPut'

import { userAction } from '../actions'

import {
  GET_USER_PROFILE_WITH_TOKEN,
  UPDATE_USER_PROFILE,
} from '../constants'

export function* getUserProfileWithToken() {
  try {
    const token = Cookie.get('token')
    const email = Cookie.get('email')

    if (!isNil(token)) {
      const response = yield call(http.post, {
        url: '/api/getProfile/',
        payload: {
          email,
          token,
        },
      })

      const { error } = response
      if (error) {
        yield put(loginAction.handleLogout())
        window.location.href = '/'
        return
      }

      yield put(userAction.getProfileWithTokenSuccess(response.data.data))
      return
    }

    yield put(userAction.getProfileWithTokenSuccess({ members: [] }))
  } catch (exception) {
    yield put(loginAction.handleLogout())
    window.location.href = '/'
  }
}

export function* updateUserProfileWithToken({ payload }) {
  try {
    const {
      email,
      firstname,
      lastname,
      mobile,
      id,
      role,
    } = payload.data

    const response = yield call(httpPut.post, {
      url: '/api/updateUser',
      payload: {
        email,
        firstname,
        lastname,
        mobile,
        id,
        role,
      },
    })

    const { error } = response
    if (error) {
      return
    }

    window.location.href = '/profile'
    yield put(userAction.updateProfileWithTokenSuccess(data))
  } catch (error) {
    console.log('error', error)
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(GET_USER_PROFILE_WITH_TOKEN, getUserProfileWithToken),
    takeLatest(UPDATE_USER_PROFILE, updateUserProfileWithToken),
  ])
}

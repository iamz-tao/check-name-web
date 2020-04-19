import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'

import {
  UPLOAD_IMAGE,
} from '../constants'

import * as http from '~/helpers/axiosWrapper'

import { loginAction } from '~/modules/authentication/actions'
import { loadingImage } from '../actions/upload-action'

export function* uploadImage({ payload }) {
  try {
    const { updateImage, content } = payload
    const token = Cookie.get('token')
    const email = Cookie.get('email')
    // const operation = 'upload_public_file'
    // if (!isNil(token)) {
    //   yield put(loadingImage({ isLoading: true }))
    //   const response = yield call(http.post, {
    //     url: '',
    //     payload: {
    //       email,
    //       token,
    //       operation,
    //       data: { content },
    //     },
    //   })
    //   yield put(loadingImage({ isLoading: false }))
    //   const { error } = response

    //   if (error) {
    //     yield put(loginAction.handleLogout())
    //     window.location.href = '/login'
    //     return
    //   }

    //   yield put({
    //     type: updateImage,
    //     payload: response.data.data,
    //   })
    // } else {
    //   yield put(loginAction.handleLogout())
    //   window.location.href = '/login'
    // }
  } catch (error) {
    console.log('error', error)
  }
}

export default function* uploadSaga() {
  yield all([
    takeLatest(UPLOAD_IMAGE, uploadImage),
  ])
}

import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

import intlMessagesEN from '~/static/locales/en.json'
import intlMessagesTH from '~/static/locales/th.json'
import * as http from '~/helpers/axiosWrapper'

import localAction from './actions'
import {
  FETCH_MESSAGE,
} from './constants'

const messages = {
  en: intlMessagesEN,
  th: intlMessagesTH,
}

export function* fetchMessage({ payload }) {
  try {
    const operation = 'get_language'
    const { data } = yield call(http.post, {
      url: '/spotsme_v1_beta_api',
      payload: {
        operation,
        data: {
          language: payload,
        },
      },
    })

    yield put(localAction.setLocale({
      lang: payload,
      messages: data.data,
    }))
  } catch (error) {
    console.log(error)
  }
}


function* productSaga() {
  yield all([
    takeLatest(FETCH_MESSAGE, fetchMessage),
  ])
}

export default [
  call(productSaga),
]

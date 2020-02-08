import {
  call,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'

import * as http from '~/helpers/axiosWrapperGet'


export function* getSubjectsAPI() {
  const token = Cookie.get('token')
  const email = Cookie.get('email')
  const data = {}

  return yield call(http.post, {
    url: '/api/getSubjectsApprove',
    payload: {
      token,
      email,
      data,
    },
  })
}


export function* getSubjectsProfessorAPI() {
  const token = Cookie.get('token')
  const email = Cookie.get('email')
  const data = {}

  return yield call(http.post, {
    url: '/api/getSubjects',
    payload: {
      token,
      email,
      data,
    },
  })
}

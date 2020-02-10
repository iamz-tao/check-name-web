import {
  call,
  put,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'
import Router from 'next/router'

import * as http from '~/helpers/axiosWrapperGet'
import * as httpDel from '~/helpers/axiosWrapperDelete'
// import { loginAction } from '~/modules/authentication/actions'
// import { subjectAction } from '../actions'

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


export function* getSubjectProfessorAPI() {
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


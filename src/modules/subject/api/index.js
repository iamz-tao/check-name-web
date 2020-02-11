import {
  call,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'

import * as http from '~/helpers/axiosWrapperGet'
import * as httpDel from '~/helpers/axiosWrapperDelete'

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


export function* getSubjectsProfessorAPI(payload) {
  console.log(payload,'apiiiiiiiiiiiiiii')
  const token = Cookie.get('token')
  const email = Cookie.get('email')
  const data = {}
  const {
    year,
    semester,
  } = payload.payload
console.log('year',year)
  return yield call(http.post, {
    url: `/api/getSubjects?year=${year}&semester=${semester}`,
    payload: {
      token,
      email,
      data,
    },
  })
}

export function* deleteSectionAPI(id) {
  const token = Cookie.get('token')
  const data = {}

  return yield call(httpDel.post, {
    url: `/api/deleteSEction/${id}`,
    payload: {
      token,
      data,
    },
  })
}

export function* deleteSubjectAPI(id) {
  const token = Cookie.get('token')
  const data = {}

  return yield call(httpDel.post, {
    url: `/api/delSubject/${id}`,
    payload: {
      token,
      data,
    },
  })
}

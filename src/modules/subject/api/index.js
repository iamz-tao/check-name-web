import {
  call,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'

import * as http from '~/helpers/axiosWrapperGet'
import * as httpDel from '~/helpers/axiosWrapperDelete'
import * as httpPost from '~/helpers/axiosWrapperPostToken'

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

export function* getSubjectsExportAPI() {
  const token = Cookie.get('token')
  const email = Cookie.get('email')
  const data = {}

  return yield call(http.post, {
    url: '/api/ListSectionTeacher',
    payload: {
      token,
      email,
      data,
    },
  })
}


export function* getSubjectsProfessorAPI() {
  const token = Cookie.get('token')
  const data = {}

  return yield call(http.post, {
    url: '/api/getSubjects',
    payload: {
      token,
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

export function* getSubjectAPI(id) {
  const token = Cookie.get('token')
  const data = {}

  return yield call(http.post, {
    url: `/api/getSubject/${id}`,
    payload: {
      token,
      data,
    },
  })
}

export function* getSectionAPI(id) {
  const token = Cookie.get('token')
  const data = {}

  return yield call(http.post, {
    url: `/api/getSection/${id}`,
    payload: {
      token,
      data,
    },
  })
}

export function* getAllStudentsApproveAPI() {
  const token = Cookie.get('token')
  const data = {}

  return yield call(http.post, {
    url: '/api/ListStudent',
    payload: {
      token,
      data,
    },
  })
}

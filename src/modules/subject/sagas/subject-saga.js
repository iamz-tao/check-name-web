import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import Cookie from 'js-cookie'
import Router from 'next/router'
import isNil from 'lodash/isNil'

import { subjectAction } from '../actions'
import {
  CREATE_SUBJECT,
  GET_SUBJECTS,
  APPROVE_SUBJECT,
  REJECT_SUBJECT,
  APPROVE_SUBJECTS,
  REJECT_SUBJECTS,
  OPEN_SECTION,
  GET_SUBJECTS_PROFESSOR,
  DELETE_SECTION,
  DELETE_SUBJECT,
} from '../constants'
import {
  getSubjectsAPI,
  getSubjectsProfessorAPI,
  deleteSectionAPI,
  deleteSubjectAPI,
} from '../api'

import * as http from '~/helpers/axiosWrapperPostToken'
import * as httpPut from '~/helpers/axiosWrapperPut'

export function* createSubject({ payload }) {
  try {
    const role = Cookie.get('role', '')
    const {
      year,
      semester,
      subject_code,
      subject_name,
      approved_status,
    } = payload.data

    const subject_status = role === 'ADMIN' ? 'APPROVE' : approved_status

    const response = yield call(http.post, {
      url: '/api/createSubject',
      payload: {
        year,
        semester,
        subject_code,
        subject_name,
        approved_status: subject_status,
      },
    })

    const { error } = response
    if (error) {
      yield put(subjectAction.createSubjectFailure({ message: response.message || 'Error has been occured' }))
      return
    }

    if (role === 'PROFESSOR') {
      Router.replace('/open-section')
    }

    if (role === 'ADMIN') {
      Router.replace('/create-subject')
    }
  } catch (exception) {
    yield put(subjectAction.createSubjectFailure({ message: 'Internal Error' }))
  }
}

export function* openSection({ payload }) {
  try {
    const {
      year,
      semester,
      Subject,
      section_number,
      Time,
      time_late,
      time_absent,
      total_mark,
    } = payload.data

    const response = yield call(http.post, {
      url: '/api/subject_register',
      payload: {
        year,
        semester,
        Subject,
        section_number,
        Time,
        time_late,
        time_absent,
        total_mark,
      },
    })

    const { error } = response
    if (error) {
      yield put(subjectAction.openSectionFailure({ message: response.message || 'Error has been occured' }))
      return
    }

    Router.replace('/open-section')
  } catch (exception) {
    yield put(subjectAction.openSectionFailure({ message: 'Internal Error' }))
  }
}

export function* getSubjects() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getSubjectsAPI()
      if (error) {
        return
      }
      yield put(subjectAction.setToSubjects(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* approveSubject({ payload }) {
  try {
    const { subject_id } = payload
    const response = yield call(httpPut.post, {
      url: `/api/approve/${subject_id}`,
      payload: {
      },
    })

    const { error } = response
    if (error) {
      return
    }
    Router.replace('/approveSubject')
    yield put(subjectAction.approveSubjectSuccess())
  } catch (error) {
    console.log('error', error)
  }
}

export function* rejectSubject({ payload }) {
  try {
    const { subject_id } = payload
    const response = yield call(httpPut.post, {
      url: `/api/reject/${subject_id}`,
      payload: {
      },
    })

    const { error } = response
    if (error) {
      return
    }

    Router.replace('/approveSubject')
    yield put(subjectAction.rejectSubjectSuccess())
  } catch (error) {
    console.log('error', error)
  }
}

export function* approveSubjects({ payload }) {
  try {
    const { approve_ids } = payload.data
    const response = yield call(httpPut.post, {
      url: '/api/approveMulty',
      payload: {
        approve_ids,
      },
    })

    const { error } = response
    if (error) {
      return
    }
    Router.replace('/approveSubject')
    yield put(subjectAction.approveSubjectSuccess())
  } catch (error) {
    console.log('error', error)
  }
}

export function* rejectSubjects({ payload }) {
  try {
    const { approve_ids } = payload.data
    const response = yield call(httpPut.post, {
      url: '/api/rejectMulty',
      payload: {
        reject_ids: approve_ids,
      },
    })

    const { error } = response
    if (error) {
      return
    }

    Router.replace('/approveSubject')
    yield put(subjectAction.rejectSubjectSuccess())
  } catch (error) {
    console.log('error', error)
  }
}

export function* getSubjectsProfessor() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getSubjectsProfessorAPI()
      if (error) {
        return
      }
      yield put(subjectAction.setSubjectsProfessor(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* deleteSection({ payload }) {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield deleteSectionAPI(payload.id)
      if (error) {
        return
      }
      yield put(subjectAction.deleteSectionSuccess(payload.id))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* deleteSubject({ payload }) {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield deleteSubjectAPI(payload.id)
      if (error) {
        return
      }
      yield put(subjectAction.deleteSubjectSuccess(payload.id))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(CREATE_SUBJECT, createSubject),
    takeLatest(GET_SUBJECTS, getSubjects),
    takeLatest(APPROVE_SUBJECT, approveSubject),
    takeLatest(REJECT_SUBJECT, rejectSubject),
    takeLatest(APPROVE_SUBJECTS, approveSubjects),
    takeLatest(REJECT_SUBJECTS, rejectSubjects),
    takeLatest(OPEN_SECTION, openSection),
    takeLatest(GET_SUBJECTS_PROFESSOR, getSubjectsProfessor),
    takeLatest(DELETE_SECTION, deleteSection),
    takeLatest(DELETE_SUBJECT, deleteSubject),
  ])
}

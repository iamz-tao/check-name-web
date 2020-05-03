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
  GET_SUBJECT,
  UPDATE_SUBJECT,
  GET_SECTION,
  UPDATE_SECTION,
  GET_STUDENTS_SECTION,
  APPROVE_STUDENT,
  REJECT_STUDENT,
  GET_ALL_STUDENTS_APPROVE,
  GET_STUDENTS_IN_SECTION,
  GET_SUBJECTS_EXPORT,
  EXPORT_REPORT,
  REMOVE_STD,
  GET_TEACH_HISTORY,
  GET_STD_IN_CLASS_HISTORY,
  GET_LIST_SECTION_TEACHER,
  GET_ATTENDANCE_SHEET,
} from '../constants'
import {
  getSubjectsAPI,
  getSubjectsExportAPI,
  getSubjectsProfessorAPI,
  deleteSectionAPI,
  deleteSubjectAPI,
  getSubjectAPI,
  getSectionAPI,
  getAllStudentsApproveAPI,
  removeStudentAPI,
  getListSectionTeacherAPI,
  getAttendanceSheetAPI,
} from '../api'

import * as http from '~/helpers/axiosWrapperPostToken'
import * as httpPut from '~/helpers/axiosWrapperPut'
import * as httpDel from '~/helpers/axiosWrapperDelete'
import * as httpGet from '~/helpers/axiosWrapperGet'

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
      yield put(subjectAction.createSubjectFailed({ message: response.message || 'Error has been occured' }))
      return
    }

    if (role === 'PROFESSOR') {
      Router.replace('/open-section')
    }

    if (role === 'ADMIN') {
      Router.replace('/list-subjects')
    }
  } catch (exception) {
    yield put(subjectAction.createSubjectFailed({ message: 'Internal Error' }))
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

    Router.replace('/professor')
  } catch (exception) {
    yield put(subjectAction.openSectionFailure({ message: 'Internal Error' }))
  }
}


export function* exportReport({ payload }) {
  try {
    const {
      year,
      semester,
      subject_code,
      subject_name,
      section,
    } = payload.data

    window.open(
      `https://us-central1-kpscheckin.cloudfunctions.net/api/export?year=${year}&semester=${semester}&subject_code=${subject_code}&subject_name=${subject_name}&section=${section}`,
      'Download',
    )
    if (payload.isShow) {
      Router.replace('/professor')
    } else {
      Router.replace('/export-report')
    }
  } catch (exception) {
    yield put(subjectAction.openSectionFailure({ message: 'Internal Error' }))
  }
}

export function* getAttendanceSheet({ payload }) {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getAttendanceSheetAPI(payload.id)
      if (error) {
        return
      }
      yield put(subjectAction.setAttendanceSheet(data.data))
    }
  } catch (error) {
    console.log('error', error)
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

export function* getSubjectsExport() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getSubjectsExportAPI()
      if (error) {
        return
      }
      yield put(subjectAction.setSubjectsExport(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

//admin get subject
export function* getSubject(payload) {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getSubjectAPI(payload.payload.id)
      if (error) {
        return
      }
      yield put(subjectAction.setSubject(data.data))
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
    yield put(subjectAction.approveSubjectSuccess(subject_id))
  } catch (error) {
    console.log('error', error)
  }
}

export function* rejectSubject({ payload }) {
  try {
    const { subject_id } = payload
    const response = yield call(httpDel.post, {
      url: `/api/reject/${subject_id}`,
      payload: {
      },
    })

    const { error } = response
    if (error) {
      return
    }

    yield put(subjectAction.rejectSubjectSuccess(subject_id))
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
    yield put(subjectAction.approveSubjectsSuccess(approve_ids))
  } catch (error) {
    console.log('error', error)
  }
}

export function* rejectSubjects({ payload }) {
  try {
    const { approve_ids } = payload.data
    const response = yield call(httpDel.post, {
      url: '/api/rejectMulty',
      payload: {
        reject_ids: approve_ids,
      },
    })

    const { error } = response
    if (error) {
      return
    }

    yield put(subjectAction.rejectSubjectsSuccess(approve_ids))
  } catch (error) {
    console.log('error', error)
  }
}

export function* getSubjectsProfessor(payload) {
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

export function* updateSection({ payload }) {
  try {
    const { data } = payload
    const response = yield call(httpPut.post, {
      url: `/api/updateSection/${payload.data.section_id}`,
      payload: {
        ...data,
      },
    })

    const { error } = response
    if (error) {
      return
    }
    Router.replace('/professor')
    yield put(subjectAction.updateSectionSuccess(payload.data))
  } catch (error) {
    console.log('error', error)
  }
}

export function* getSection(payload) {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getSectionAPI(payload.payload.id)
      if (error) {
        return
      }
      yield put(subjectAction.setSection(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* updateSubject({ payload }) {
  try {
    const response = yield call(httpPut.post, {
      url: `/api/updateSubject/${payload.data.id}`,
      payload: {
        subject_code: payload.data.subject_code,
        subject_name: payload.data.subject_name,
      },
    })

    const { error } = response
    if (error) {
      return
    }
    Router.replace('/list-subjects')
    yield put(subjectAction.updateSubjectSuccess(payload.data))
  } catch (error) {
    console.log('error', error)
  }
}

export function* getStudentsSection({ payload }) {
  try {
    const response = yield call(http.post, {
      url: '/api/listSecStudent',
      payload: {
        ...payload,
      },
    })
    const { error } = response
    if (error) {
      // yield put(subjectAction.openSectionFailure({ message: response.message || 'Error has been occured' }))
      return
    }
    yield put(subjectAction.setStudentsSection(response.data.data))
    // Router.replace('/approve-student')
  } catch (exception) {
    // yield put(subjectAction.openSectionFailure({ message: 'Internal Error' }))
  }
}

export function* approveStudent({ payload }) {
  try {
    if (payload.id.length === 1) {
      const response = yield call(httpPut.post, {
        url: '/api/approveStudent',
        payload: {
          ...payload,
        },
      })

      const { error } = response
      if (error) {
        return
      }
      const data = {
        id: payload.id,
        type: payload.type,
      }
      yield put(subjectAction.approveStudentSuccess(data))
    } else {
      const { id } = payload
      const response = yield call(httpPut.post, {
        url: '/api/approveStudent',
        payload: {
          ...id,
        },
      })

      const { error } = response
      if (error) {
        return
      }
      const data = {
        id,
        type: payload.type,
      }
      yield put(subjectAction.approveStudentsSuccess(data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* rejectStudent({ payload }) {
  try {
    if (payload.id.length === 1) {
      const response = yield call(httpDel.post, {
        url: '/api/rejectStudent',
        payload: {
          ...payload,
        },
      })

      const { error } = response
      if (error) {
        return
      }

      yield put(subjectAction.rejectStudentSuccess(payload.id))
    } else {
      const { id } = payload
      const response = yield call(httpPut.post, {
        url: '/api/rejectStudent',
        payload: {
          ...id,
        },
      })

      const { error } = response
      if (error) {
        return
      }
      const data = {
        id,
        type: payload.type,
      }
      yield put(subjectAction.rejectStudentsSuccess(data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* getListSectionsTeacher() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getListSectionTeacherAPI()
      if (error) {
        return
      }
      yield put(subjectAction.setListSectionsTeacher(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}


export function* getAllStudentsApprove() {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield getAllStudentsApproveAPI()
      if (error) {
        return
      }
      yield put(subjectAction.setAllStudentsApprove(data.data))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* getStudentsInSection({ payload }) {
  try {
    const { id } = payload
    const token = Cookie.get('token')
    const data = {}
    const response = yield call(httpGet.post, {
      url: `/api/ListStudentInSection/${id}`,
      payload: {
        token,
        data,
      },
    })
    const { error } = response
    if (error) {
      // yield put(subjectAction.openSectionFailure({ message: response.message || 'Error has been occured' }))
      return
    }
    yield put(subjectAction.setStudentsInSection(response.data.data))
  } catch (error) {
    console.log('error', error)
  }
}


export function* removeStudent({ payload }) {
  try {
    const token = Cookie.get('token')
    if (!isNil(token)) {
      const { data, error } = yield removeStudentAPI(payload.id)
      if (error) {
        return
      }
      yield put(subjectAction.removeStudentSuccess(payload.id))
    }
  } catch (error) {
    console.log('error', error)
  }
}

export function* getTeachHistory({ payload }) {
  try {
    const { id } = payload
    const token = Cookie.get('token')
    const data = {}
    const response = yield call(httpGet.post, {
      url: `/api/TeachHistory/${id}`,
      payload: {
        token,
        data,
      },
    })
    const { error } = response
    if (error) {
      // yield put(subjectAction.openSectionFailure({ message: response.message || 'Error has been occured' }))
      return
    }
    yield put(subjectAction.setTeachHistory(response.data.data))
  } catch (error) {
    console.log('error', error)
  }
}

export function* getStudentInClassHitory({ payload }) {
  try {
    const { id } = payload
    const token = Cookie.get('token')
    const data = {}
    const response = yield call(httpGet.post, {
      url: `/api/studentInClass/${id}`,
      payload: {
        token,
        data,
      },
    })
    const { error } = response
    if (error) {
      // yield put(subjectAction.openSectionFailure({ message: response.message || 'Error has been occured' }))
      return
    }
    yield put(subjectAction.setStudentInClassHistory(response.data.data))
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
    takeLatest(GET_SUBJECT, getSubject),
    takeLatest(UPDATE_SUBJECT, updateSubject),
    takeLatest(GET_SECTION, getSection),
    takeLatest(UPDATE_SECTION, updateSection),
    takeLatest(GET_STUDENTS_SECTION, getStudentsSection),
    takeLatest(APPROVE_STUDENT, approveStudent),
    takeLatest(REJECT_STUDENT, rejectStudent),
    takeLatest(GET_ALL_STUDENTS_APPROVE, getAllStudentsApprove),
    takeLatest(GET_STUDENTS_IN_SECTION, getStudentsInSection),
    takeLatest(GET_SUBJECTS_EXPORT, getSubjectsExport),
    takeLatest(EXPORT_REPORT, exportReport),
    takeLatest(REMOVE_STD, removeStudent),
    takeLatest(GET_TEACH_HISTORY, getTeachHistory),
    takeLatest(GET_STD_IN_CLASS_HISTORY, getStudentInClassHitory),
    takeLatest(GET_LIST_SECTION_TEACHER, getListSectionsTeacher),
    takeLatest(GET_ATTENDANCE_SHEET, getAttendanceSheet),
  ])
}

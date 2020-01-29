import {
  CREATE_SUBJECT,
  CREATE_SUBJECT_SUCCESS,
  CREATE_SUBJECT_FAILED,
  GET_SUBJECTS,
  SET_TO_SUBJECTS,
  APPROVE_SUBJECT,
  REJECT_SUBJECT,
  APPROVE_SUBJECT_SUCCESS,
  REJECT_SUBJECT_SUCCESS,
  APPROVE_SUBJECTS,
  REJECT_SUBJECTS,
  GET_SUBJUECT_PROFESSOR,
  SET_SUBJECT_PROFESSOR,
  OPEN_SECTION,
  OPEN_SECTION_SUCCESS,
  OPEN_SECTION_FAILED,
} from '../constants'

export const createSubject = payload => ({
  payload,
  type: CREATE_SUBJECT,
})

export const createSubjectSuccess = payload => ({
  payload,
  type: CREATE_SUBJECT_SUCCESS,
})

export const createSubjectFailed = payload => ({
  payload,
  type: CREATE_SUBJECT_FAILED,
})

export const getSubjects = payload => ({
  payload,
  type: GET_SUBJECTS,
})

export const setToSubjects = payload => ({
  payload,
  type: SET_TO_SUBJECTS,
})

export const approveSubject = payload => ({
  payload,
  type: APPROVE_SUBJECT,
})

export const approveSubjectSuccess = payload => ({
  payload,
  type: APPROVE_SUBJECT_SUCCESS,
})

export const rejectSubject = payload => ({
  payload,
  type: REJECT_SUBJECT,
})

export const rejectSubjectSuccess = payload => ({
  payload,
  type: REJECT_SUBJECT_SUCCESS,
})

export const approveSubjects = payload => ({
  payload,
  type: APPROVE_SUBJECTS,
})

export const rejectSubjects = payload => ({
  payload,
  type: REJECT_SUBJECTS,
})

export const getSubjectProfessor = payload => ({
  payload,
  type: GET_SUBJUECT_PROFESSOR,
})

export const setSubjectProfessor = payload => ({
  payload,
  type: SET_SUBJECT_PROFESSOR,
})

export const openSection = payload => ({
  payload,
  type: OPEN_SECTION,
})

export const openSectionSuccess = payload => ({
  payload,
  type: OPEN_SECTION_SUCCESS,
})

export const openSectionFailure = payload => ({
  payload,
  type: OPEN_SECTION_FAILED,
})
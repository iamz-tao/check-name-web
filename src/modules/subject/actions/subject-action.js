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
  OPEN_SECTION,
  OPEN_SECTION_SUCCESS,
  OPEN_SECTION_FAILED,
  GET_SUBJECTS_PROFESSOR,
  SET_SUBJECT_PROFESSOR,
  DELETE_SECTION,
  DELETE_SECTION_SUCCESS,
  DELETE_SUBJECT,
  DELETE_SUBJECT_SUCCESS,
  GET_SUBJECT,
  SET_SUBJECT,
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

export const getSubjectsProfessor = payload => ({
  payload,
  type: GET_SUBJECTS_PROFESSOR,
})

export const setSubjectsProfessor = payload => ({
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

export const deleteSection = payload => ({
  payload,
  type: DELETE_SECTION,
})

export const deleteSectionSuccess = payload => ({
  payload,
  type: DELETE_SECTION_SUCCESS,
})

export const deleteSubject = payload => ({
  payload,
  type: DELETE_SUBJECT,
})

export const deleteSubjectSuccess = payload => ({
  payload,
  type: DELETE_SUBJECT_SUCCESS,
})

export const getSubject = payload => ({
  payload,
  type: GET_SUBJECT,
})

export const setSubject = payload => ({
  payload,
  type: SET_SUBJECT,
})
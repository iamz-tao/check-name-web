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
  APPROVE_SUBJECTS_SUCCESS,
  REJECT_SUBJECTS_SUCCESS,
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
  UPDATE_SUBJECT,
  UPDATE_SUBJECT_SUCCESS,
  GET_SECTION,
  SET_SECTION,
  UPDATE_SECTION,
  UPDATE_SECTION_SUCCESS,
  SET_STUDENTS_SECTION,
  GET_STUDENTS_SECTION,
  APPROVE_STUDENT,
  APPROVE_STUDENT_SUCCESS,
  REJECT_STUDENT,
  REJECT_STUDENT_SUCCESS,
  GET_ALL_STUDENTS_APPROVE,
  SET_ALL_STUDENTS_APPROVE,
  APPROVE_STUDENTS_SUCCESS,
  REJECT_STUDENTS_SUCCESS,
  GET_STUDENTS_IN_SECTION,
  SET_STUDENTS_IN_SECTION,
  GET_SUBJECTS_EXPORT,
  SET_SUBJECTS_EXPORT,
  EXPORT_REPORT,
  REMOVE_STD,
  REMOVE_STD_SUCCESS,
  GET_TEACH_HISTORY,
  SET_TEACH_HISTORY,
  GET_STD_IN_CLASS_HISTORY,
  SET_STD_IN_CLASS_HISTORY,
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

export const approveSubjectsSuccess = payload => ({
  payload,
  type: APPROVE_SUBJECTS_SUCCESS,
})


export const rejectSubject = payload => ({
  payload,
  type: REJECT_SUBJECT,
})

export const rejectSubjectSuccess = payload => ({
  payload,
  type: REJECT_SUBJECT_SUCCESS,
})

export const rejectSubjectsSuccess = payload => ({
  payload,
  type: REJECT_SUBJECTS_SUCCESS,
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

export const updateSubject = payload => ({
  payload,
  type: UPDATE_SUBJECT,
})

export const updateSubjectSuccess = payload => ({
  payload,
  type: UPDATE_SUBJECT_SUCCESS,
})

export const getSection = payload => ({
  payload,
  type: GET_SECTION,
})

export const setSection = payload => ({
  payload,
  type: SET_SECTION,
})

export const updateSection = payload => ({
  payload,
  type: UPDATE_SECTION,
})

export const updateSectionSuccess = payload => ({
  payload,
  type: UPDATE_SECTION_SUCCESS,
})

export const getStudentsSection = payload => ({
  payload,
  type: GET_STUDENTS_SECTION,
})

export const setStudentsSection = payload => ({
  payload,
  type: SET_STUDENTS_SECTION,
})

export const approveStudent = payload => ({
  payload,
  type: APPROVE_STUDENT,
})

export const approveStudentSuccess = payload => ({
  payload,
  type: APPROVE_STUDENT_SUCCESS,
})

export const rejectStudent = payload => ({
  payload,
  type: REJECT_STUDENT,
})

export const rejectStudentSuccess = payload => ({
  payload,
  type: REJECT_STUDENT_SUCCESS,
})

export const getAllStudentsApprove = payload => ({
  payload,
  type: GET_ALL_STUDENTS_APPROVE,
})

export const setAllStudentsApprove = payload => ({
  payload,
  type: SET_ALL_STUDENTS_APPROVE,
})

export const approveStudentsSuccess = payload => ({
  payload,
  type: APPROVE_STUDENTS_SUCCESS,
})

export const rejectStudentsSuccess = payload => ({
  payload,
  type: REJECT_STUDENTS_SUCCESS,
})

export const getStudentsInSection = payload => ({
  payload,
  type: GET_STUDENTS_IN_SECTION,
})

export const setStudentsInSection = payload => ({
  payload,
  type: SET_STUDENTS_IN_SECTION,
})

export const getSubjectsExport = payload => ({
  payload,
  type: GET_SUBJECTS_EXPORT,
})

export const setSubjectsExport = payload => ({
  payload,
  type: SET_SUBJECTS_EXPORT,
})

export const exportReport = payload => ({
  payload,
  type: EXPORT_REPORT,
})

export const removeStudent = payload => ({
  payload,
  type: REMOVE_STD,
})

export const removeStudentSuccess = payload => ({
  payload,
  type: REMOVE_STD_SUCCESS,
})

export const getTeachHistory = payload => ({
  payload,
  type: GET_TEACH_HISTORY,
})

export const setTeachHistory = payload => ({
  payload,
  type: SET_TEACH_HISTORY,
})

export const getStudentInClassHistory = payload => ({
  payload,
  type: GET_STD_IN_CLASS_HISTORY,
})

export const setStudentInClassHistory = payload => ({
  payload,
  type: SET_STD_IN_CLASS_HISTORY,
})
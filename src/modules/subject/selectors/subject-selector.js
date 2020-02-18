
import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

const stateSelector = state => state.getIn(['subject', 'subject'])

export const getSubjects = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['subjects'], '')
    } catch (error) {
      return fromJS({})
    }
  },
)

export const getSubjectsProfessor = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['professor', 'subjects'], '')
    } catch (error) {
      return fromJS({})
    }
  },
)

export const getSubject = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['subject'], '')
    } catch (error) {
      return fromJS({})
    }
  },
)

export const getSection = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['professor', 'section', 0], '')
    } catch (error) {
      return fromJS({})
    }
  },
)

export const getStudentApprove = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['professor', 'studentApprove'], '')
    } catch (error) {
      return fromJS({})
    }
  },
)
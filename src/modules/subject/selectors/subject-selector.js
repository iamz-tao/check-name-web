
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

export const getSubjectProfessor = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['subjectProfessor'], '')
    } catch (error) {
      return fromJS({})
    }
  },
)


import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

const stateSelector = state => state.getIn(['admin'])

export const getUsers = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['user', 'users'])
    } catch (error) {
      return fromJS({})
    }
  },
)

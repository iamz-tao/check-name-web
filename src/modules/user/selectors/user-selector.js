import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

const stateSelector = state => state

export const getProfile = createSelector(
  stateSelector,
  (state) => {
    try {

      return fromJS({
        ...state.getIn(['user', 'user', 'profile'])
          .toJS(),
      })
    } catch (error) {
      return fromJS({})
    }
  },
)

export const getUserRole = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['user', 'user', 'profile', 'role'], '')
    } catch (error) {
      return fromJS({})
    }
  },
)

export const getUserStateHttp = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['user', 'user', 'httpState'])
    } catch (error) {
      return fromJS({})
    }
  },
)

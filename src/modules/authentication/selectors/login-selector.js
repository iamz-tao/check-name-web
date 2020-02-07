import { createSelector } from 'reselect'

const stateSelector = state => state

export const getAuthenticationLoginState = createSelector(
  stateSelector,
  state => state.getIn(['authentication', 'login'])
    .toJS() || {},
)

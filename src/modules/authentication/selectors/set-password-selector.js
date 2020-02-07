import { createSelector } from 'reselect'

const stateSelector = state => state

export const getAuthenticationSetPasswordState = createSelector(
  stateSelector,
  state => state.getIn(['authentication', 'setPassword'])
    .toJS() || {},
)

import { createSelector } from 'reselect'

const stateSelector = state => state

export const getAuthenticationRegisterState = createSelector(
  stateSelector,
  state => state.getIn(['authentication', 'register'])
    .toJS() || {},
)

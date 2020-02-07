import { createSelector } from 'reselect'

const stateSelector = state => state

export const getAuthenticationForgetPasswordState = createSelector(
  stateSelector,
  state => state.getIn(['authentication', 'forgetPassword']).toJS() || {},
)

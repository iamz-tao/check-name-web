import { createSelector } from 'reselect'

const stateSelector = state => state

export const selectLocale = createSelector(
  stateSelector,
  state => state.getIn(['locale', 'lang']),
)

export const selectMessages = createSelector(
  stateSelector,
  state => state.getIn(['locale', 'messages'])
    .toJS(),
)

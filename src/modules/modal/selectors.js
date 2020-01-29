import { createSelector } from 'reselect'

const stateSelector = state => state

export const showModal = createSelector(
  stateSelector,
  state => state.getIn(['modal', 'status']),
)

export const contentInModal = createSelector(
  stateSelector,
  state => state.getIn(['modal', 'content']).toJS(),
)

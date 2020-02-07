import { createSelector } from 'reselect'

const stateSelector = state => state

export const modalType = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['modal', 'modal', 'modalType'])
        .toJS()
    } catch (error) {
      return {}
    }
  },
)

export const getQueryTitle = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['modal', 'modal', 'query'])
    } catch (error) {
      return {}
    }
  },
)

export const getImages = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['modal', 'modal', 'images'])
    } catch (error) {
      return []
    }
  },
)

export const getDemand = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['modal', 'modal', 'demand'])
    } catch (error) {
      return []
    }
  },
)

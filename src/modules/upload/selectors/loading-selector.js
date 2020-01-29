import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

const loadingSelector = state => state.getIn(['loading', 'loading'])

export const getIsLoading = createSelector(
  loadingSelector,
  (loadingState) => {
    try {
      return loadingState.getIn(['isLoading'])
    } catch (error) {
      return fromJS({})
    }
  },
)


import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

const stateSelector = state => state.getIn(['beacon'])

export const getAllBeacon = createSelector(
  stateSelector,
  (state) => {
    try {
      return state.getIn(['beacons'])
    } catch (error) {
      return fromJS({})
    }
  },
)

import { combineReducers } from 'redux-immutable'
import userReducer from './user-reducer'
import yearReducer from './year-reducer'
import beaconReducer from './beacon-reducer'

export default combineReducers({
  user: userReducer,
  year: yearReducer,
  beacon: beaconReducer,
})

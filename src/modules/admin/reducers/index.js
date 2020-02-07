import { combineReducers } from 'redux-immutable'
import userReducer from './user-reducer'
import yearReducer from './year-reducer'

export default combineReducers({
  user: userReducer,
  year: yearReducer,
})

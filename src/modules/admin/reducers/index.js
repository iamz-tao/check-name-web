import { combineReducers } from 'redux-immutable'
import userReducer from './user-reducer'

export default combineReducers({
  user: userReducer,
})

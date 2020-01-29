import { combineReducers } from 'redux-immutable'
import subjectReducer from './subject-reducer'

export default combineReducers({
  subject: subjectReducer,
})

import { combineReducers } from 'redux-immutable'
import loadingReducer from './loading-reducer'

export default combineReducers({
  loading: loadingReducer,
})

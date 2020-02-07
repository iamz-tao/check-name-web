import { combineReducers } from 'redux-immutable'

import cookieReducer from './cookie-reducer'

export default combineReducers({
  cookie: cookieReducer,
})

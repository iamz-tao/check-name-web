import { combineReducers } from 'redux-immutable'
import loginReducer from './login-reducer'
import registerReducer from './register-reducer'
import forgetPasswordReducer from './forget-password-reducer'
import setPasswordReducer from './set-password-reducer'

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  forgetPassword: forgetPasswordReducer,
  setPassword: setPasswordReducer,
})

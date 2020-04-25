import { combineReducers } from 'redux-immutable'

import { reducer as formReducer } from 'redux-form/immutable'
import authenticationReducer from '~/modules/authentication/reducers'
import userReducer from '~/modules/user/reducers'
// import localeReducer from '~/modules/locale/reducer'
import loadingReducer from '~/modules/upload/reducers'
import adminReducer from '~/modules/admin/reducers'
import modalReducer from '~/modules/modal/reducer'
import subjectReducer from '~/modules/subject/reducers'
import beaconReducer from './modules/admin/reducers/beacon-reducer'

export default combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
  // locale: localeReducer,
  form: formReducer,
  loading: loadingReducer,
  admin: adminReducer,
  modal: modalReducer,
  subject: subjectReducer,
  beacon: beaconReducer,
})

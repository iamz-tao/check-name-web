import { all } from 'redux-saga/effects'
import authenticationSaga from '~/modules/authentication/sagas'
import userSaga from '~/modules/user/sagas'
import uploadSaga from '~/modules/upload/sagas'
import cookieSaga from '~/modules/storage/sagas'
import adminSaga from '~/modules/admin/sagas'
// import locale from '~/modules/locale/saga'
import subjectSaga from '~/modules/subject/sagas'

const sagas = [
  all(authenticationSaga),
  all(cookieSaga),
  all(userSaga),
  all(uploadSaga),
  all(adminSaga),
  // all(locale),
  all(subjectSaga),
]

export default function* rootSaga() {
  yield all(sagas)
}

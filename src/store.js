import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fromJS, Map } from 'immutable'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore(initialState) {
  let tempState = initialState
  if (!Map.isMap(initialState)) {
    tempState = fromJS(initialState)
  }
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    tempState,
    bindMiddleware([sagaMiddleware]),
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore

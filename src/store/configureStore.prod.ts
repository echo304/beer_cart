import { createStore } from 'redux';
// import { applyMiddleware, createStore } from 'redux';
// import createSagaMiddleware from 'redux-saga';

import rootReducer from '../redux/rootReducer';
// import saga from '../sagas';

function configureStore() {
  // const sagaMiddleware = createSagaMiddleware();
  // const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer);
  // sagaMiddleware.run(saga);
  return store;
}

export default configureStore;

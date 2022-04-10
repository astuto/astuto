import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

const createStoreHelper = () => (
  createStore(
    rootReducer,
    compose(
      applyMiddleware(thunkMiddleware)
    )
  )
);

export default createStoreHelper;
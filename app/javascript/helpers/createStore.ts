import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

const createStoreHelper = () => (
  createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
    ),
  )
);

export default createStoreHelper;
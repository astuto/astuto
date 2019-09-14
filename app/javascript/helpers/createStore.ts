import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

const composeEnhancers = composeWithDevTools({
  trace: true,
});

const createStoreHelper = () => (
  createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunkMiddleware)
    )
  )
);

export default createStoreHelper;
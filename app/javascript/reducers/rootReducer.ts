import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import postStatusesReducer from './postStatusesReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  postStatuses: postStatusesReducer,
});

export type State = ReturnType<typeof rootReducer>
export default rootReducer;
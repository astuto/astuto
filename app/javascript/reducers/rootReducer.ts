import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import postStatusesReducer from './postStatusesReducer';
import currentPostReducer from './currentPostReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  postStatuses: postStatusesReducer,
  currentPost: currentPostReducer,
});

export type State = ReturnType<typeof rootReducer>
export default rootReducer;
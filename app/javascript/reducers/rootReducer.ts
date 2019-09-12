import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import postStatusesReducer from './postStatusesReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  postStatuses: postStatusesReducer,
  currentPost: postReducer,
});

export type State = ReturnType<typeof rootReducer>
export default rootReducer;
import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import postStatusesReducer from './postStatusesReducer';
import currentPostReducer from './currentPostReducer';
import siteSettingsReducer from './siteSettingsReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  postStatuses: postStatusesReducer,
  currentPost: currentPostReducer,
  siteSettings: siteSettingsReducer,
});

export type State = ReturnType<typeof rootReducer>
export default rootReducer;
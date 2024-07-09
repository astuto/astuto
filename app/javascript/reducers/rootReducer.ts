import { combineReducers } from 'redux';

import tenantSignUpReducer from './tenantSignUpReducer';

import postsReducer from './postsReducer';
import boardsReducer from './boardsReducer';
import postStatusesReducer from './postStatusesReducer';
import usersReducer from './usersReducer';
import currentPostReducer from './currentPostReducer';
import oAuthsReducer from './oAuthsReducer';
import siteSettingsReducer from './siteSettingsReducer';
import moderationReducer from './moderationReducer';

const rootReducer = combineReducers({
  tenantSignUp: tenantSignUpReducer,

  posts: postsReducer,
  boards: boardsReducer,
  postStatuses: postStatusesReducer,
  users: usersReducer,
  currentPost: currentPostReducer,
  oAuths: oAuthsReducer,
  
  siteSettings: siteSettingsReducer,
  moderation: moderationReducer,
});

export type State = ReturnType<typeof rootReducer>
export default rootReducer;
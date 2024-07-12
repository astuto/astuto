import { POSTS_REQUEST_FAILURE, POSTS_REQUEST_START, POSTS_REQUEST_SUCCESS, PostsRequestActionTypes } from '../actions/Post/requestPosts';
import { POST_UPDATE_FAILURE, POST_UPDATE_START, POST_UPDATE_SUCCESS, PostUpdateActionTypes } from '../actions/Post/updatePost';
import {
  UserUpdateActionTypes,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
} from '../actions/User/updateUser';

import moderationFeedbackReducer, { ModerationFeedbackState } from './Moderation/feedbackReducer';
import moderationUsersReducer, { ModerationUsersState } from './Moderation/usersReducer';

interface ModerationState {
  feedback: ModerationFeedbackState;
  users: ModerationUsersState;
}

const initialState: ModerationState = {
  feedback: moderationFeedbackReducer(undefined, {} as any),
  users: moderationUsersReducer(undefined, {} as any),
};

const moderationReducer = (
  state = initialState,
  action:
    PostsRequestActionTypes |
    PostUpdateActionTypes |
    UserUpdateActionTypes
): ModerationState => {
  switch (action.type) {
    case POSTS_REQUEST_START:
    case POSTS_REQUEST_SUCCESS:
    case POSTS_REQUEST_FAILURE:
    case POST_UPDATE_START:
    case POST_UPDATE_SUCCESS:
    case POST_UPDATE_FAILURE:
      return {
        ...state,
        feedback: moderationFeedbackReducer(state.feedback, action),
      };

    case USER_UPDATE_START:
    case USER_UPDATE_SUCCESS:
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        users: moderationUsersReducer(state.users, action),
      };

    default:
      return state;
  }
}

export default moderationReducer;
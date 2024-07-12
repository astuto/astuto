import { postRequestSuccess } from "../../actions/Post/requestPost";
import { POSTS_REQUEST_FAILURE, POSTS_REQUEST_START, POSTS_REQUEST_SUCCESS, PostsRequestActionTypes } from "../../actions/Post/requestPosts";
import { POST_UPDATE_FAILURE, POST_UPDATE_START, POST_UPDATE_SUCCESS, PostUpdateActionTypes, postUpdateSuccess } from "../../actions/Post/updatePost";
import IPost from "../../interfaces/IPost";
import postReducer from "../postReducer";

export interface ModerationFeedbackState {
  posts: Array<IPost>;
  areLoading: boolean;
  areUpdating: boolean;
  error: string;
}

const initialState: ModerationFeedbackState = {
  posts: [],
  areLoading: true,
  areUpdating: false,
  error: '',
};

const moderationFeedbackReducer = (
  state = initialState,
  action: PostsRequestActionTypes | PostUpdateActionTypes,
) => {
  switch (action.type) {
    case POSTS_REQUEST_START:
      return {
        ...state,
        areLoading: true,
      };

    case POST_UPDATE_START:
      return {
        ...state,
        areUpdating: true,
      };

    case POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        areLoading: false,
        error: '',
        posts: action.posts.map(post => postReducer(undefined, postRequestSuccess(post))),
      };

    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        areUpdating: false,
        error: '',
        posts: state.posts.map(post => post.id === action.post.id ? postReducer(post, postUpdateSuccess(action.post)) : post),
      };

    case POSTS_REQUEST_FAILURE:
    case POST_UPDATE_FAILURE:
      return {
        ...state,
        areLoading: false,
        error: action.error,
      };
    
    default:
      return state;
  }
}

export default moderationFeedbackReducer;
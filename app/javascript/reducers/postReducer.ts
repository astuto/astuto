import {
  PostRequestActionTypes,
  POST_REQUEST_SUCCESS,
} from '../actions/Post/requestPost';

import {
  PostUpdateActionTypes,
  POST_UPDATE_SUCCESS,
} from '../actions/Post/updatePost';

import {
  ChangePostBoardSuccessAction,
  CHANGE_POST_BOARD_SUCCESS,
} from '../actions/Post/changePostBoard';

import {
  ChangePostStatusSuccessAction,
  CHANGE_POST_STATUS_SUCCESS,
} from '../actions/Post/changePostStatus';

import IPost from '../interfaces/IPost';

const initialState: IPost = {
  id: 0,
  title: '',
  description: null,
  boardId: 0,
  postStatusId: null,
  likesCount: 0,
  liked: 0,
  commentsCount: 0,
  hotness: 0,
  userId: 0,
  userEmail: '',
  userFullName: '',
  createdAt: '',
};

const postReducer = (
  state = initialState,
  action:
    PostRequestActionTypes |
    PostUpdateActionTypes |
    ChangePostBoardSuccessAction |
    ChangePostStatusSuccessAction,
): IPost => {
  switch (action.type) {
    case POST_REQUEST_SUCCESS:
      return {
        id: action.post.id,
        title: action.post.title,
        description: action.post.description,
        boardId: action.post.board_id,
        postStatusId: action.post.post_status_id,
        likesCount: action.post.likes_count,
        liked: action.post.liked,
        commentsCount: action.post.comments_count,
        hotness: action.post.hotness,
        userId: action.post.user_id,
        userEmail: action.post.user_email,
        userFullName: action.post.user_full_name,
        createdAt: action.post.created_at,
      };

    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        title: action.post.title,
        description: action.post.description,
        boardId: action.post.board_id,
        postStatusId: action.post.post_status_id,
      };

    case CHANGE_POST_BOARD_SUCCESS:
      return {
        ...state,
        boardId: action.newBoardId,
      };

    case CHANGE_POST_STATUS_SUCCESS:
      return {
        ...state,
        postStatusId: action.newPostStatusId,
      };

    default:
      return state;
  }
}

export default postReducer;
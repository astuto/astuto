import {
  PostRequestActionTypes,
  POST_REQUEST_START,
  POST_REQUEST_SUCCESS,
  POST_REQUEST_FAILURE,
} from '../actions/Post/requestPost';

import {
  PostUpdateActionTypes,
  POST_UPDATE_START,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAILURE,
} from '../actions/Post/updatePost';

import { POST_TOGGLE_EDIT_MODE, PostToggleEditMode } from '../actions/Post/togglePostEditMode';

import {
  ChangePostEditFormActionTypes,
  POST_CHANGE_EDIT_FORM_TITLE,
  POST_CHANGE_EDIT_FORM_DESCRIPTION,
  POST_CHANGE_EDIT_FORM_BOARD,
  POST_CHANGE_EDIT_FORM_POST_STATUS,
} from '../actions/Post/changePostEditForm';

import {
  ChangePostBoardSuccessAction,
  CHANGE_POST_BOARD_SUCCESS,
} from '../actions/Post/changePostBoard';

import {
  ChangePostStatusSuccessAction,
  CHANGE_POST_STATUS_SUCCESS,
} from '../actions/Post/changePostStatus';

import {
  LikesRequestActionTypes,
  LIKES_REQUEST_START,
  LIKES_REQUEST_SUCCESS,
  LIKES_REQUEST_FAILURE,
} from '../actions/Like/requestLikes';

import {
  LikeActionTypes,
  LIKE_SUBMIT_SUCCESS,
} from '../actions/Like/submitLike';

import {
  CommentsRequestActionTypes,
  COMMENTS_REQUEST_START,
  COMMENTS_REQUEST_SUCCESS,
  COMMENTS_REQUEST_FAILURE,
} from '../actions/Comment/requestComments';

import {
  HandleCommentRepliesType,
  TOGGLE_COMMENT_REPLY,
  SET_COMMENT_REPLY_BODY,
  TOGGLE_COMMENT_IS_POST_UPDATE_FLAG,
} from '../actions/Comment/handleCommentReplies';

import {
  CommentSubmitActionTypes,
  COMMENT_SUBMIT_START,
  COMMENT_SUBMIT_SUCCESS,
  COMMENT_SUBMIT_FAILURE,
} from '../actions/Comment/submitComment';

import {
  CommentDeleteActionTypes,
  COMMENT_DELETE_SUCCESS,
} from '../actions/Comment/deleteComment';

import {
  CommentUpdateActionTypes,
  COMMENT_UPDATE_SUCCESS,
} from '../actions/Comment/updateComment';

import { FollowActionTypes, FOLLOW_SUBMIT_SUCCESS } from '../actions/Follow/submitFollow';
import { FollowRequestActionTypes, FOLLOW_REQUEST_SUCCESS } from '../actions/Follow/requestFollow';

import {
  PostStatusChangesRequestActionTypes,
  POST_STATUS_CHANGES_REQUEST_START,
  POST_STATUS_CHANGES_REQUEST_SUCCESS,
  POST_STATUS_CHANGES_REQUEST_FAILURE,
} from '../actions/PostStatusChange/requestPostStatusChanges';

import {
  PostStatusChangeSubmitted,
  POST_STATUS_CHANGE_SUBMITTED
} from '../actions/PostStatusChange/submittedPostStatusChange';

import postReducer from './postReducer';
import likesReducer from './likesReducer';
import commentsReducer from './commentsReducer';

import { LikesState } from './likesReducer';
import { CommentsState } from './commentsReducer';
import postStatusChangesReducer, { PostStatusChangesState } from './postStatusChangesReducer';

import IPost from '../interfaces/IPost';

export interface PostEditFormState {
  title: string;
  description?: string;
  boardId: number;
  postStatusId?: number;

  isUpdating: boolean;
  error: string;
}

interface CurrentPostState {
  item: IPost;
  isLoading: boolean;
  error: string;
  editMode: boolean;
  editForm: PostEditFormState;
  likes: LikesState;
  followed: boolean;
  comments: CommentsState;
  postStatusChanges: PostStatusChangesState,
}

const initialState: CurrentPostState = {
  item: postReducer(undefined, {} as PostRequestActionTypes),
  isLoading: false,
  error: '',
  editMode: false,
  editForm: {
    title: '',
    description: '',
    boardId: 1,
    postStatusId: 1,

    isUpdating: false,
    error: '',
  },
  likes: likesReducer(undefined, {} as LikesRequestActionTypes),
  followed: false,
  comments: commentsReducer(undefined, {} as CommentsRequestActionTypes),
  postStatusChanges: postStatusChangesReducer(undefined, {} as PostStatusChangesRequestActionTypes),
};

const currentPostReducer = (
  state = initialState,
  action:
    PostRequestActionTypes |
    PostUpdateActionTypes |
    PostToggleEditMode |
    ChangePostEditFormActionTypes |
    ChangePostBoardSuccessAction |
    ChangePostStatusSuccessAction |
    LikesRequestActionTypes |
    LikeActionTypes |
    CommentsRequestActionTypes |
    HandleCommentRepliesType |
    CommentSubmitActionTypes |
    CommentUpdateActionTypes |
    CommentDeleteActionTypes |
    FollowActionTypes |
    FollowRequestActionTypes |
    PostStatusChangesRequestActionTypes |
    PostStatusChangeSubmitted
): CurrentPostState => {
  switch (action.type) {
    case POST_REQUEST_START:
      return {
        ...state,
        isLoading: true,
      };

    case POST_REQUEST_SUCCESS:
      return {
        ...state,
        item: postReducer(undefined, action),
        isLoading: false,
        error: '',
      };

    case POST_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case POST_UPDATE_START:
      return {
        ...state, editForm: { ...state.editForm, isUpdating: true, error: '' }
      };

    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        item: postReducer(state.item, action),
        editForm: {
          ...state.editForm,
          isUpdating: false,
        },
        editMode: false,
      };

    case POST_UPDATE_FAILURE:
      return {
        ...state, editForm: { ...state.editForm, isUpdating: false, error: action.error }
      };

    case POST_UPDATE_START:
      return {
        ...state, editForm: { ...state.editForm, isUpdating: true }
      };

    case POST_TOGGLE_EDIT_MODE:
      return {
        ...state,
        editMode: !state.editMode,
        editForm: {
          ...state.editForm,
          title: state.item.title,
          description: state.item.description,
          boardId: state.item.boardId,
          postStatusId: state.item.postStatusId,
        },
      };

    case POST_CHANGE_EDIT_FORM_TITLE:
      return {
        ...state,
        editForm: { ...state.editForm, title: action.title },
      };

    case POST_CHANGE_EDIT_FORM_DESCRIPTION:
      return {
        ...state,
        editForm: { ...state.editForm, description: action.description },
      };

    case POST_CHANGE_EDIT_FORM_BOARD:
      return {
        ...state,
        editForm: { ...state.editForm, boardId: action.boardId },
      };

    case POST_CHANGE_EDIT_FORM_POST_STATUS:
      return {
        ...state,
        editForm: { ...state.editForm, postStatusId: action.postStatusId },
      };

    case CHANGE_POST_BOARD_SUCCESS:
    case CHANGE_POST_STATUS_SUCCESS:
      return {
        ...state,
        item: postReducer(state.item, action),
      };

    case LIKES_REQUEST_START:
    case LIKES_REQUEST_SUCCESS:
    case LIKES_REQUEST_FAILURE:
    case LIKE_SUBMIT_SUCCESS:
      return {
        ...state,
        likes: likesReducer(state.likes, action),
      };

    case COMMENTS_REQUEST_START:
    case COMMENTS_REQUEST_SUCCESS:
    case COMMENTS_REQUEST_FAILURE:
    case TOGGLE_COMMENT_REPLY:
    case SET_COMMENT_REPLY_BODY:
    case COMMENT_SUBMIT_START:
    case COMMENT_SUBMIT_SUCCESS:
    case COMMENT_SUBMIT_FAILURE:
    case COMMENT_UPDATE_SUCCESS:
    case COMMENT_DELETE_SUCCESS:
    case TOGGLE_COMMENT_IS_POST_UPDATE_FLAG:
      return {
        ...state,
        comments: commentsReducer(state.comments, action),
      };

    case FOLLOW_REQUEST_SUCCESS:
      return {
        ...state,
        followed: action.follow.user_id ? true : false,
      };
      
    case FOLLOW_SUBMIT_SUCCESS:
      return {
        ...state,
        followed: action.isFollow,
      };

    case POST_STATUS_CHANGES_REQUEST_START:
    case POST_STATUS_CHANGES_REQUEST_SUCCESS:
    case POST_STATUS_CHANGES_REQUEST_FAILURE:
    case POST_STATUS_CHANGE_SUBMITTED:
      return {
        ...state,
        postStatusChanges: postStatusChangesReducer(state.postStatusChanges, action),
      };

    default:
      return state;
  }
}

export default currentPostReducer;
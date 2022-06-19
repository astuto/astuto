import {
  CommentRequestSuccessAction,
  COMMENT_REQUEST_SUCCESS,
} from '../actions/Comment/requestComment';

import IComment from '../interfaces/IComment';

const initialState: IComment = {
  id: 0,
  body: '',
  parentId: null,
  isPostUpdate: false,
  userFullName: '<Unknown user>',
  userEmail: 'example@example.com',
  createdAt: undefined,
  updatedAt: undefined,
};

const commentReducer = (
  state = initialState,
  action: CommentRequestSuccessAction,
): IComment => {
  switch (action.type) {
    case COMMENT_REQUEST_SUCCESS:
      return {
        id: action.comment.id,
        body: action.comment.body,
        parentId: action.comment.parent_id,
        isPostUpdate: action.comment.is_post_update,
        userFullName: action.comment.user_full_name,
        userEmail: action.comment.user_email,
        createdAt: action.comment.created_at,
        updatedAt: action.comment.updated_at,
      };

    default:
      return state;
  }
}

export default commentReducer;
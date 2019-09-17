import {
  COMMENT_REQUEST_SUCCESS,
} from '../actions/requestComment';

import IComment from '../interfaces/IComment';

const initialState: IComment = {
  id: 0,
  body: '',
  userFullName: '',
  updatedAt: '',
};

const commentReducer = (
  state = initialState,
  action,
): IComment => {
  switch (action.type) {
    case COMMENT_REQUEST_SUCCESS:
      return {
        id: action.comment.id,
        body: action.comment.body,
        userFullName: action.comment.user_full_name,
        updatedAt: action.comment.updated_at,
      };

    default:
      return state;
  }
}

export default commentReducer;
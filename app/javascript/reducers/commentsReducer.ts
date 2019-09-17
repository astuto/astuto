import {
  CommentsRequestActionTypes,
  COMMENTS_REQUEST_START,
  COMMENTS_REQUEST_SUCCESS,
  COMMENTS_REQUEST_FAILURE,
} from '../actions/requestComments';
import { commentRequestSuccess } from '../actions/requestComment';

import commentReducer from './commentReducer';

import IComment from '../interfaces/IComment';

export interface CommentsState {
  items: Array<IComment>;
  areLoading: boolean;
  error: string;
}

const initialState: CommentsState = {
  items: [],
  areLoading: false,
  error: '',
};

const commentsReducer = (
  state = initialState,
  action,
): CommentsState => {
  switch (action.type) {
    case COMMENTS_REQUEST_START:
      return {
        ...state,
        areLoading: true,
      };

    case COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        items: action.comments.map(
          comment => commentReducer(undefined, commentRequestSuccess(comment))
        ),
        areLoading: false,
        error: '',
      };

    case COMMENTS_REQUEST_FAILURE:
      return {
        ...state,
        areLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export default commentsReducer;
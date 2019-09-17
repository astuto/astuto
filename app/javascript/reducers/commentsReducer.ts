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
  page: number;
  haveMore: boolean;
}

const initialState: CommentsState = {
  items: [],
  areLoading: false,
  error: '',
  page: 0,
  haveMore: true,
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
        items: action.page === 1 ?
          action.comments.map(comment => commentReducer(undefined, commentRequestSuccess(comment)))
          :
          [
            ...state.items,
            ...action.comments.map(
              comment => commentReducer(undefined, commentRequestSuccess(comment))
            ),
          ],
        page: action.page,
        haveMore: action.comments.length === 15,
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
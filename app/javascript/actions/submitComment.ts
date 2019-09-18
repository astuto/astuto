import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State } from '../reducers/rootReducer';

import ICommentJSON from '../interfaces/json/IComment';

export const COMMENT_SUBMIT_START = 'COMMENT_SUBMIT_START';
interface CommentSubmitStartAction {
  type: typeof COMMENT_SUBMIT_START;
  parentId: number;
}

export const COMMENT_SUBMIT_SUCCESS = 'COMMENT_SUBMIT_SUCCESS';
interface CommentSubmitSuccessAction {
  type: typeof COMMENT_SUBMIT_SUCCESS;
  comment: ICommentJSON;
}

export const COMMENT_SUBMIT_FAILURE = 'COMMENT_SUBMIT_FAILURE';
interface CommentSubmitFailureAction {
  type: typeof COMMENT_SUBMIT_FAILURE;
  parentId: number;
  error: string;
}

export type CommentSubmitActionTypes =
  CommentSubmitStartAction |
  CommentSubmitSuccessAction |
  CommentSubmitFailureAction;

const commentSubmitStart = (parentId): CommentSubmitStartAction => ({
  type: COMMENT_SUBMIT_START,
  parentId,
});

const commentSubmitSuccess = (
  commentJSON: ICommentJSON,
): CommentSubmitSuccessAction => ({
  type: COMMENT_SUBMIT_SUCCESS,
  comment: commentJSON,
});

const commentSubmitFailure = (parentId, error): CommentSubmitFailureAction => ({
  type: COMMENT_SUBMIT_FAILURE,
  parentId,
  error,
});

export const submitComment = (
  postId,
  body,
  parentId,
  authenticityToken,
): ThunkAction<void, State, null, Action<string>> => async (dispatch) => {
  dispatch(commentSubmitStart(parentId));

  try {
    const res = await fetch(`/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': authenticityToken,
      },
      body: JSON.stringify({
        comment: {
          body,
          parent_id: parentId,
        },
      }),
    });
    const json = await res.json();

    if (res.status === 201) {
      dispatch(commentSubmitSuccess(json));
    } else {
      dispatch(commentSubmitFailure(parentId, json.error));
    }
  } catch (e) {
    dispatch(commentSubmitFailure(parentId, e));
  }
}
import ICommentJSON from '../interfaces/json/IComment';

export const COMMENT_REQUEST_SUCCESS = 'COMMENT_REQUEST_SUCCESS';
interface CommentRequestSuccessAction {
  type: typeof COMMENT_REQUEST_SUCCESS;
  comment: ICommentJSON;
}

export const commentRequestSuccess = (comment: ICommentJSON): CommentRequestSuccessAction => ({
  type: COMMENT_REQUEST_SUCCESS,
  comment,
});
export const TOGGLE_COMMENT_REPLY = 'TOGGLE_COMMENT_REPLY';
interface ToggleCommentReplyAction {
  type: typeof TOGGLE_COMMENT_REPLY;
  commentId: number;
}

export const SET_COMMENT_REPLY_BODY = 'SET_COMMENT_REPLY_BODY';
interface SetCommentReplyBodyAction {
  type: typeof SET_COMMENT_REPLY_BODY;
  commentId: number;
  body: string;
}

export const toggleCommentReply = (commentId): ToggleCommentReplyAction => ({
  type: TOGGLE_COMMENT_REPLY,
  commentId,
});

export const setCommentReplyBody = (commentId, body): SetCommentReplyBodyAction => ({
  type: SET_COMMENT_REPLY_BODY,
  commentId,
  body,
});

export type HandleCommentRepliesType =
  ToggleCommentReplyAction |
  SetCommentReplyBodyAction;
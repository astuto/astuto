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

export const TOGGLE_COMMENT_IS_POST_UPDATE_FLAG = 'TOGGLE_COMMENT_IS_POST_UPDATE_FLAG';
interface ToggleCommentIsPostUpdateFlag {
  type: typeof TOGGLE_COMMENT_IS_POST_UPDATE_FLAG;
  commentId: number;
}

export const toggleCommentReply = (commentId: number): ToggleCommentReplyAction => ({
  type: TOGGLE_COMMENT_REPLY,
  commentId,
});

export const setCommentReplyBody = (commentId: number, body: string): SetCommentReplyBodyAction => ({
  type: SET_COMMENT_REPLY_BODY,
  commentId,
  body,
});

export const toggleCommentIsPostUpdateFlag = (commentId: number): ToggleCommentIsPostUpdateFlag => ({
  type: TOGGLE_COMMENT_IS_POST_UPDATE_FLAG,
  commentId,
});

export type HandleCommentRepliesType =
  ToggleCommentReplyAction |
  SetCommentReplyBodyAction |
  ToggleCommentIsPostUpdateFlag;
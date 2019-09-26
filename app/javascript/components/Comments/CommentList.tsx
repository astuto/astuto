import * as React from 'react';

import Comment from './Comment';

import IComment from '../../interfaces/IComment';
import { CommentRepliesState } from '../../reducers/commentRepliesReducer';

interface Props {
  comments: Array<IComment>;
  replies: Array<CommentRepliesState>;
  parentId: number;
  level: number;

  toggleCommentReply(commentId: number): void;
  setCommentReplyBody(commentId: number, body: string): void;
  handleSubmitComment(body: string, parentId: number): void;

  isLoggedIn: boolean;
  isPowerUser: boolean;
}

const CommentList = ({
  comments,
  replies,
  parentId,
  level,

  toggleCommentReply,
  setCommentReplyBody,
  handleSubmitComment,

  isLoggedIn,
  isPowerUser,
}: Props) => (
  <React.Fragment>
    {comments.map((comment, i) => {
      if (comment.parentId === parentId) {
        return (
          <div className="commentList" key={i}>
            <Comment
              reply={replies.find(reply => reply.commentId === comment.id)}
              handleToggleCommentReply={() => toggleCommentReply(comment.id)}
              handleCommentReplyBodyChange={
                (e: React.FormEvent) => (
                  setCommentReplyBody(comment.id, (e.target as HTMLTextAreaElement).value)
                )
              }
              handleSubmitComment={handleSubmitComment}
              {...comment}

              isLoggedIn={isLoggedIn}
              isPowerUser={isPowerUser}
            />

            <CommentList
              comments={comments}
              replies={replies}
              parentId={comment.id}
              level={level+1}

              toggleCommentReply={toggleCommentReply}
              setCommentReplyBody={setCommentReplyBody}
              handleSubmitComment={handleSubmitComment}

              isLoggedIn={isLoggedIn}
              isPowerUser={isPowerUser}
            />
          </div>
        );
      } else return null;
    })}
  </React.Fragment>
);

export default CommentList;
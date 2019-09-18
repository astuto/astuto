import * as React from 'react';
import { FormEvent } from 'react';

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
}

const CommentList = ({
  comments,
  replies,
  parentId,
  level,

  toggleCommentReply,
  setCommentReplyBody,
  handleSubmitComment,
}: Props) => (
  <React.Fragment>
    {comments.map((comment, i) => {
      if (comment.parentId === parentId) {
        return (
          <div className="commentList" key={i}>
            <Comment
              level={level}
              reply={replies.find(reply => reply.commentId === comment.id)}
              handleToggleCommentReply={() => toggleCommentReply(comment.id)}
              handleCommentReplyBodyChange={
                (e: FormEvent) => (
                  setCommentReplyBody(comment.id, (e.target as HTMLTextAreaElement).value)
                )
              }
              handleSubmitComment={handleSubmitComment}
              {...comment}
            />

            <CommentList
              comments={comments}
              replies={replies}
              parentId={comment.id}
              level={level+1}

              toggleCommentReply={toggleCommentReply}
              setCommentReplyBody={setCommentReplyBody}
              handleSubmitComment={handleSubmitComment}
            />
          </div>
        );
      } else return null;
    })}
  </React.Fragment>
);

export default CommentList;
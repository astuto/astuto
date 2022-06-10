import * as React from 'react';

import Comment from './Comment';

import IComment from '../../interfaces/IComment';
import { ReplyFormState } from '../../reducers/replyFormReducer';

interface Props {
  comments: Array<IComment>;
  replyForms: Array<ReplyFormState>;
  parentId: number;
  level: number;

  toggleCommentReply(commentId: number): void;
  setCommentReplyBody(commentId: number, body: string): void;
  handleToggleIsCommentUpdate(commentId: number, currentIsPostUpdate: boolean): void;
  handleSubmitComment(body: string, parentId: number, isPostUpdate: boolean): void;

  isLoggedIn: boolean;
  isPowerUser: boolean;
  userEmail: string;
}

const CommentList = ({
  comments,
  replyForms,
  parentId,
  level,

  toggleCommentReply,
  setCommentReplyBody,
  handleToggleIsCommentUpdate,
  handleSubmitComment,

  isLoggedIn,
  isPowerUser,
  userEmail,
}: Props) => (
  <>
    {comments.map((comment, i) => {
      if (comment.parentId === parentId) {
        return (
          <div className="commentList" key={i}>
            <Comment
              replyForm={replyForms.find(replyForm => replyForm.commentId === comment.id)}
              handleToggleCommentReply={() => toggleCommentReply(comment.id)}
              handleCommentReplyBodyChange={
                (e: React.FormEvent) => (
                  setCommentReplyBody(comment.id, (e.target as HTMLTextAreaElement).value)
                )
              }
              handleToggleIsCommentUpdate={handleToggleIsCommentUpdate}
              handleSubmitComment={handleSubmitComment}
              {...comment}

              isLoggedIn={isLoggedIn}
              isPowerUser={isPowerUser}
              currentUserEmail={userEmail}
            />

            <CommentList
              comments={comments}
              replyForms={replyForms}
              parentId={comment.id}
              level={level+1}

              toggleCommentReply={toggleCommentReply}
              setCommentReplyBody={setCommentReplyBody}
              handleToggleIsCommentUpdate={handleToggleIsCommentUpdate}
              handleSubmitComment={handleSubmitComment}

              isLoggedIn={isLoggedIn}
              isPowerUser={isPowerUser}
              userEmail={userEmail}
            />
          </div>
        );
      } else return null;
    })}
  </>
);

export default CommentList;
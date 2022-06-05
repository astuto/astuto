import * as React from 'react';
import I18n from 'i18n-js';

import NewComment from './NewComment';
import CommentList from './CommentList';
import Spinner from '../shared/Spinner';
import { DangerText } from '../shared/CustomTexts';

import IComment from '../../interfaces/IComment';
import { ReplyFormState } from '../../reducers/replyFormReducer';
import Separator from '../shared/Separator';

interface Props {
  postId: number;
  isLoggedIn: boolean;
  isPowerUser: boolean;
  userEmail: string;
  authenticityToken: string;

  comments: Array<IComment>;
  replyForms: Array<ReplyFormState>;
  areLoading: boolean;
  error: string;

  requestComments(postId: number, page?: number): void;
  toggleCommentReply(commentId: number): void;
  setCommentReplyBody(commentId: number, body: string): void;
  toggleCommentIsPostUpdateFlag(): void;
  toggleCommentIsPostUpdate(
    postId: number,
    commentId: number,
    currentIsPostUpdate: boolean,
    authenticityToken: string,
  ): void;
  submitComment(
    postId: number,
    body: string,
    parentId: number,
    isPostUpdate: boolean,
    authenticityToken: string,
  ): void;
}

class CommentsP extends React.Component<Props> {
  componentDidMount() {
    this.props.requestComments(this.props.postId);
  }

  _handleToggleIsCommentUpdate = (commentId: number, currentIsPostUpdate: boolean) => {
    this.props.toggleCommentIsPostUpdate(
      this.props.postId,
      commentId,
      currentIsPostUpdate,
      this.props.authenticityToken,
    );
  }

  _handleSubmitComment = (body: string, parentId: number, isPostUpdate: boolean) => {
    this.props.submitComment(
      this.props.postId,
      body,
      parentId,
      isPostUpdate,
      this.props.authenticityToken,
    );
  }

  render() {
    const {
      isLoggedIn,
      isPowerUser,
      userEmail,

      comments,
      replyForms,
      areLoading,
      error,

      toggleCommentReply,
      setCommentReplyBody,
      toggleCommentIsPostUpdateFlag,
    } = this.props;

    const postReply = replyForms.find(replyForm => replyForm.commentId === null);

    return (
      <div className="commentsContainer">
        <NewComment
          body={postReply && postReply.body}
          parentId={null}
          postUpdateFlagValue={postReply && postReply.isPostUpdate}
          isSubmitting={postReply && postReply.isSubmitting}
          error={postReply && postReply.error}
          handleChange={
            (e: React.FormEvent) => (
              setCommentReplyBody(null, (e.target as HTMLTextAreaElement).value)
            )
          }
          handlePostUpdateFlag={toggleCommentIsPostUpdateFlag}
          handleSubmit={this._handleSubmitComment}

          isLoggedIn={isLoggedIn}
          isPowerUser={isPowerUser}
          userEmail={userEmail}
        />

        { areLoading ? <Spinner /> : null }
        { error ? <DangerText>{error}</DangerText> : null }

        <div className="commentsTitle">
          {I18n.t('post.comments.title')}
          <Separator />
          {I18n.t('common.comments_number', { count: comments.length })}
        </div>

        <CommentList
          comments={comments}
          replyForms={replyForms}
          toggleCommentReply={toggleCommentReply}
          setCommentReplyBody={setCommentReplyBody}
          handleToggleIsCommentUpdate={this._handleToggleIsCommentUpdate}
          handleSubmitComment={this._handleSubmitComment}
          parentId={null}
          level={1}
          isLoggedIn={isLoggedIn}
          isPowerUser={isPowerUser}
          userEmail={userEmail}
        />
      </div>
    );
  }
}

export default CommentsP;
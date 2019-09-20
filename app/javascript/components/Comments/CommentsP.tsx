import * as React from 'react';
import { FormEvent } from 'react';

import NewComment from './NewComment';
import CommentList from './CommentList';
import Spinner from '../shared/Spinner';
import { DangerText, UppercaseText } from '../shared/CustomTexts';

import IComment from '../../interfaces/IComment';
import { CommentRepliesState } from '../../reducers/commentRepliesReducer';

interface Props {
  postId: number;
  isLoggedIn: boolean;
  authenticityToken: string;

  comments: Array<IComment>;
  replies: Array<CommentRepliesState>;
  areLoading: boolean;
  error: string;

  requestComments(postId: number, page?: number): void;
  toggleCommentReply(commentId: number): void;
  setCommentReplyBody(commentId: number, body: string): void;
  submitComment(
    postId: number,
    body: string,
    parentId: number,
    authenticityToken: string,
  ): void;
}

class CommentsP extends React.Component<Props> {
  componentDidMount() {
    this.props.requestComments(this.props.postId);
  }

  _handleSubmitComment = (body, parentId) => {
    this.props.submitComment(
      this.props.postId,
      body,
      parentId,
      this.props.authenticityToken,
    );
  }

  render() {
    const {
      isLoggedIn,

      comments,
      replies,
      areLoading,
      error,

      toggleCommentReply,
      setCommentReplyBody,
      submitComment,
    } = this.props;

    const postReply = replies.find(reply => reply.commentId === -1);

    return (
      <div className="commentsContainer">
        <NewComment
          body={postReply && postReply.body}
          parentId={null}
          isSubmitting={postReply && postReply.isSubmitting}
          handleChange={
            (e: FormEvent) => (
              setCommentReplyBody(-1, (e.target as HTMLTextAreaElement).value)
            )
          }
          handleSubmit={this._handleSubmitComment}

          isLoggedIn={isLoggedIn}
        />

        { areLoading ? <Spinner /> : null }
        { error ? <DangerText>{error}</DangerText> : null }

        <span className="commentsTitle">
          activity &bull; {comments.length} comments
        </span>

        <CommentList
          comments={comments}
          replies={replies}
          toggleCommentReply={toggleCommentReply}
          setCommentReplyBody={setCommentReplyBody}
          handleSubmitComment={this._handleSubmitComment}
          parentId={null}
          level={1}
          isLoggedIn={isLoggedIn}
        />
      </div>
    );
  }
}

export default CommentsP;
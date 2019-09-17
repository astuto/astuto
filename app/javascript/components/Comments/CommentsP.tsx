import * as React from 'react';

import CommentList from './CommentList';
import Spinner from '../shared/Spinner';
import { DangerText } from '../shared/CustomTexts';

import IComment from '../../interfaces/IComment';
import { CommentRepliesState } from '../../reducers/commentRepliesReducer';

interface Props {
  postId: number;

  comments: Array<IComment>;
  replies: Array<CommentRepliesState>;
  areLoading: boolean;
  error: string;

  requestComments(postId: number, page?: number);
  toggleCommentReply(commentId: number);
  setCommentReplyBody(commentId: number, body: string);
}

class CommentsP extends React.Component<Props> {
  componentDidMount() {
    this.props.requestComments(this.props.postId);
  }

  render() {
    const {
      comments,
      replies,
      areLoading,
      error,

      toggleCommentReply,
      setCommentReplyBody,
    } = this.props;

    return (
      <div className="comments">
        <h2>Comments</h2>

        { areLoading ? <Spinner /> : null }
        { error ? <DangerText>{error}</DangerText> : null }

        <CommentList
          comments={comments}
          replies={replies}
          toggleCommentReply={toggleCommentReply}
          setCommentReplyBody={setCommentReplyBody}
          parentId={null}
          level={1}
        />
      </div>
    );
  }
}

export default CommentsP;
import * as React from 'react';

import CommentList from './CommentList';
import Spinner from '../shared/Spinner';
import { DangerText } from '../shared/CustomTexts';

import IComment from '../../interfaces/IComment';

interface Props {
  postId: number;

  comments: Array<IComment>;
  areLoading: boolean;
  error: string;

  requestComments(postId: number, page?: number);
}

class CommentsP extends React.Component<Props> {
  componentDidMount() {
    this.props.requestComments(this.props.postId);
  }

  render() {
    const {
      comments,
      areLoading,
      error,
    } = this.props;

    return (
      <div className="comments">
        <h2>Comments</h2>

        { areLoading ? <Spinner /> : null }
        { error ? <DangerText>{error}</DangerText> : null }

        <CommentList
          comments={comments}
          parentId={null}
          level={1}
        />
      </div>
    );
  }
}

export default CommentsP;
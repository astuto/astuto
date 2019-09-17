import * as React from 'react';

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
      <div>
        {comments.map((comment, i) => (
          <div key={i}>{comment.body}</div>
        ))}
      </div>
    );
  }
}

export default CommentsP;
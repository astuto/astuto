import * as React from 'react';

import Comment from './Comment';

import IComment from '../../interfaces/IComment';

interface Props {
  comments: Array<IComment>;
  parentId: number;
  level: number;
}

const CommentList = ({ comments, parentId, level }: Props) => (
  <React.Fragment>
    {comments.map((comment, i) => {
      if (comment.parentId === parentId) {
        return (
          <div className="commentList">
            <Comment level={level} {...comment} />

            <CommentList
              comments={comments}
              parentId={comment.id}
              level={level+1}
            />
          </div>
        );
      } else return null;
    })}
  </React.Fragment>
);

export default CommentList;
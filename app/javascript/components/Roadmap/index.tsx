import * as React from 'react';

import PostListByPostStatus from './PostListByPostStatus';

import IPostStatus from '../../interfaces/IPostStatus';
import IPostJSON from '../../interfaces/json/IPost';
import IBoard from '../../interfaces/IBoard';

import '../../stylesheets/components/Roadmap.scss';

interface Props {
  postStatuses: Array<IPostStatus>;
  posts: Array<IPostJSON>;
  boards: Array<IBoard>;
}

class Roadmap extends React.Component<Props> {
  render () {
    const { postStatuses, posts, boards } = this.props;

    return (
      <div className="roadmapColumns d-flex justify-content-between flex-wrap">
        {postStatuses.map((postStatus, i) => (
          <PostListByPostStatus
            postStatus={postStatus}
            posts={posts.filter(post => post.post_status_id === postStatus.id)}
            boards={boards}

            key={i}
          />
        ))}
      </div>
    );
  }
}

export default Roadmap;
import * as React from 'react';

import PostList from './PostList';

import IPostStatus from '../../interfaces/IPostStatus';
import IPost from '../../interfaces/IPost';
import IBoard from '../../interfaces/IBoard';

import '../../stylesheets/components/Roadmap/PostListByPostStatus.scss';

interface Props {
  postStatus: IPostStatus;
  posts: Array<IPost>;
  boards: Array<IBoard>;
}

const PostListByPostStatus = ({ postStatus, posts, boards }: Props) => (
  <div className="roadmapColumn" style={{borderColor: postStatus.color}}>
    <div className="columnHeader" style={{borderBottomColor: postStatus.color}}>
      <div className="dot" style={{backgroundColor: postStatus.color}}></div>
      <div className="columnTitle">{postStatus.name}</div>
    </div>
    <div className="scrollContainer">
      <PostList
        posts={posts}
        boards={boards}
      />
    </div>
  </div>
);

export default PostListByPostStatus;
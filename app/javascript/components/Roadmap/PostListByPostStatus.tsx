import * as React from 'react';

import PostList from './PostList';

import IPostStatus from '../../interfaces/IPostStatus';
import IPostJSON from '../../interfaces/json/IPost';
import IBoard from '../../interfaces/IBoard';

interface Props {
  postStatus: IPostStatus;
  posts: Array<IPostJSON>;
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
import * as React from 'react';

import PostList from './PostList';
import { TitleText } from '../shared/CustomTexts';

import IPostStatus from '../../interfaces/IPostStatus';
import IPostJSON from '../../interfaces/json/IPost';
import IBoard from '../../interfaces/IBoard';

interface Props {
  postStatus: IPostStatus;
  posts: Array<IPostJSON>;
  boards: Array<IBoard>;
}

const PostListByPostStatus = ({ postStatus, posts, boards }: Props) => (
  <div className="roadmapColumn">
    <div className="columnHeader"
      style={{backgroundColor: postStatus.color}}>
      <div className="columnTitle"><TitleText>{postStatus.name}</TitleText></div>
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
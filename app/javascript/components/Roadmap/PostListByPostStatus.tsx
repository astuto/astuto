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
  <div className="roadmapColumn card my-2 px-2" style={{borderColor: postStatus.color}}>
    <div className="columnHeader card-header d-flex bg-transparent"
      style={{borderBottomColor: postStatus.color}}>
      <div className="dot" style={{backgroundColor: postStatus.color}}></div>
      <div className="columnTitle"><TitleText>{postStatus.name}</TitleText></div>
    </div>
    <div className="scrollContainer card-body">
      <PostList
        posts={posts}
        boards={boards}
      />
    </div>
  </div>
);

export default PostListByPostStatus;
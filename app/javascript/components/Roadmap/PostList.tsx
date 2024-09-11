import * as React from 'react';
import I18n from 'i18n-js';

import PostListItem from './PostListItem';
import { CenteredMutedText } from '../common/CustomTexts';

import IPostJSON from '../../interfaces/json/IPost';
import IBoard from '../../interfaces/IBoard';

interface Props {
  posts: Array<IPostJSON>;
  boards: Array<IBoard>;
  openPostsInNewTab: boolean;
}

const PostList = ({ posts, boards, openPostsInNewTab }: Props) => (
  <div className="postList">
    {
      posts.length > 0 ?
        posts.map((post, i) => (
          <PostListItem
            id={post.id}
            title={post.title}
            boardName={boards.find(board => board.id === post.board_id).name}
            openPostInNewTab={openPostsInNewTab}
            key={i}
          />
        ))
      :
        <CenteredMutedText>{ I18n.t('board.posts_list.empty') }</CenteredMutedText>
    }
  </div>
);

export default PostList;
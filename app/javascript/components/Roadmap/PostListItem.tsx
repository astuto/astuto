import * as React from 'react';

import { TitleText, UppercaseText } from '../common/CustomTexts';

interface Props {
  id: number;
  title: string;
  boardName: string;
  openPostInNewTab: boolean;
}

const PostListItem = ({id, title, boardName, openPostInNewTab}: Props) => (
  <a href={`/posts/${id}`} className="postLink" target={openPostInNewTab ? '_blank' : '_self'}>
    <div className="postListItem">
      <TitleText>{title}</TitleText>
      <UppercaseText>{boardName}</UppercaseText>
    </div>
  </a>
);

export default PostListItem;
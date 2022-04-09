import * as React from 'react';

import IPostStatus from '../../../interfaces/IPostStatus';
import PostStatusLabel from "../../shared/PostStatusLabel";
import DragZone from '../../shared/DragZone';
import Separator from '../../shared/Separator';

const PostStatusEditable = ({id, name, color}: IPostStatus) => (
  <div className="postStatusEditable">
    <DragZone />
    
    <PostStatusLabel name={name} color={color} />

    <div className="postStatusEditableActions">
      <a href="#">Edit</a>
      <Separator />
      <a href="#">Delete</a>
    </div>
  </div>
);

export default PostStatusEditable;
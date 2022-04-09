import * as React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import PostStatusLabel from "../../shared/PostStatusLabel";
import DragZone from '../../shared/DragZone';
import Separator from '../../shared/Separator';

const PostStatusEditable = ({id, name, color, index}) => (
  <Draggable key={id} draggableId={id.toString()} index={index}>
    {provided => (
      <li className="postStatusEditable" ref={provided.innerRef} {...provided.draggableProps}>
        <DragZone dndProvided={provided} />
        
        <PostStatusLabel name={name} color={color} />

        <div className="postStatusEditableActions">
          <a href="#">Edit</a>
          <Separator />
          <a href="#">Delete</a>
        </div>
      </li>
    )}
  </Draggable>
);

export default PostStatusEditable;
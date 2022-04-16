import * as React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import PostStatusLabel from "../../shared/PostStatusLabel";
import DragZone from '../../shared/DragZone';
import Separator from '../../shared/Separator';

interface Props {
  id: number;
  name: string;
  color: string;
  index: number;
  settingsAreUpdating: boolean;
  handleDelete(id: number): void;
}

const PostStatusEditable = ({id, name, color, index, settingsAreUpdating, handleDelete}: Props) => (
  <Draggable key={id} draggableId={id.toString()} index={index} isDragDisabled={settingsAreUpdating}>
    {provided => (
      <li className="postStatusEditable" ref={provided.innerRef} {...provided.draggableProps}>
        <DragZone dndProvided={provided} isDragDisabled={settingsAreUpdating} />
        
        <PostStatusLabel name={name} color={color} />

        <div className="postStatusEditableActions">
          <a href="#">Edit</a>
          <Separator />
          <a
            onClick={() => handleDelete(id)}
            data-confirm="Are you sure?"
          >
            Delete
          </a>
        </div>
      </li>
    )}
  </Draggable>
);

export default PostStatusEditable;
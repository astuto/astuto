import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import DragZone from '../../common/DragZone';
import { TitleText } from '../../common/CustomTexts';

interface Props {
  id: number;
  name: string;
  color: string;
  index: number;
  settingsAreUpdating: boolean;
}

const RoadmapPostStatus = ({
  id,
  name,
  color,
  index,
  settingsAreUpdating,
}: Props) => (
  <Draggable key={id} draggableId={id.toString()} index={index} isDragDisabled={settingsAreUpdating}>
    {provided => (
      <div className="roadmapPostStatus" ref={provided.innerRef} {...provided.draggableProps}>
        <div className="roadmapPostStatusHeader" style={{backgroundColor: color}}>
          <DragZone color='white' dndProvided={provided} isDragDisabled={settingsAreUpdating} />
          <TitleText>{name}</TitleText>
        </div>
        <div className="roadmapPostStatusContent">
        </div>
      </div>
    )}
  </Draggable>
);

export default RoadmapPostStatus;
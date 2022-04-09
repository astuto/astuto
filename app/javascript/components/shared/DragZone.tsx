import * as React from 'react';

const DragZone = ({dndProvided}) => (
  <span className="drag-zone" {...dndProvided.dragHandleProps}>
    <span className="drag-icon"></span>
  </span>
);

export default DragZone;
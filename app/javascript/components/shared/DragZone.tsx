import * as React from 'react';

const DragZone = ({dndProvided, isDragDisabled}) => (
  <span
    className={`drag-zone${isDragDisabled ? ' drag-zone-disabled' : ''}`}
    {...dndProvided.dragHandleProps}
  >
    <span className="drag-icon"></span>
  </span>
);

export default DragZone;
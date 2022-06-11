import * as React from 'react';

const DragZone = ({dndProvided, isDragDisabled, color = 'black'}) => (
  <span
    className={`drag-zone${isDragDisabled ? ' drag-zone-disabled' : ''}`}
    {...dndProvided.dragHandleProps}
  >
    <span className={`drag-icon${color === 'white' ? ' drag-icon-white' : ''}`}></span>
  </span>
);

export default DragZone;
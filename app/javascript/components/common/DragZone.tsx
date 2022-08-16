import * as React from 'react';
import { MdDragIndicator } from 'react-icons/md';

interface Props {
  dndProvided: any;
  isDragDisabled: boolean;
  color?: 'black' | 'white';
}

const DragZone = ({
  dndProvided,
  isDragDisabled,
  color = 'black',
}: Props) => (
  <span
    className={`drag-zone${isDragDisabled ? ' drag-zone-disabled' : ''}`}
    {...dndProvided.dragHandleProps}
  >
    <MdDragIndicator color={color} size={18} />
  </span>
);

export default DragZone;
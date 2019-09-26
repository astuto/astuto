import * as React from 'react';

import IBoard from '../../interfaces/IBoard';

interface Props {
  boards: Array<IBoard>;
  selectedBoardId: number;
  
  handleChange(
    newBoardId: number,
  ): void;
}

const PostBoardSelect = ({
  boards,
  selectedBoardId,
  handleChange,
}: Props) => (
  <select
    value={selectedBoardId || 'Loading...'}
    onChange={
      (e: React.FormEvent) => (
        handleChange(parseInt((e.target as HTMLSelectElement).value))
    )}
    id="selectPickerBoard"
    className="selectPicker"
  >
    <optgroup label="Boards">
      {boards.map((board, i) => (
        <option value={board.id} key={i}>
          {board.name}
        </option>
      ))}
    </optgroup>
  </select>
);

export default PostBoardSelect;
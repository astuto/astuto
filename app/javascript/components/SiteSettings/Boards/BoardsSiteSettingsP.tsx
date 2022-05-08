import * as React from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import BoardEditable from './BoardEditable';
import BoardForm from './BoardForm';
import SiteSettingsInfoBox from '../../shared/SiteSettingsInfoBox';
import Spinner from '../../shared/Spinner';
import { BoardsState } from '../../../reducers/boardsReducer';
import { CenteredMutedText } from '../../shared/CustomTexts';
import IBoard from '../../../interfaces/IBoard';

interface Props {
  authenticityToken: string;

  boards: BoardsState;
  settingsAreUpdating: boolean;
  settingsError: string;

  requestBoards(): void;
  submitBoard(
    name: string,
    description: string,
    onSuccess: Function,
    authenticityToken: string,
  ): void;
  updateBoard(
    id: number,
    name: string,
    description: string,
    onSuccess: Function,
    authenticityToken: string,
  ): void;
  updateBoardOrder(
    id: number,
    boards: Array<IBoard>,
    sourceIndex: number,
    destinationIndex: number,
    authenticityToken: string,
  ): void;
  deleteBoard(id: number, authenticityToken: string): void;
}

class BoardsSiteSettingsP extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.requestBoards();
  }

  handleSubmit(name: string, description: string, onSuccess: Function) {
    this.props.submitBoard(name, description, onSuccess, this.props.authenticityToken);
  }

  handleUpdate(id: number, name: string, description: string, onSuccess: Function) {
    this.props.updateBoard(id, name, description, onSuccess, this.props.authenticityToken);
  }

  handleDragEnd(result) {
    if (result.destination == null || result.source.index === result.destination.index)
      return;
    
    this.props.updateBoardOrder(
      parseInt(result.draggableId),
      this.props.boards.items,
      result.source.index,
      result.destination.index,
      this.props.authenticityToken,
    );
  }

  handleDelete(id: number) {
    this.props.deleteBoard(id, this.props.authenticityToken);
  }

  render() {
    const {
      boards,
      settingsAreUpdating,
      settingsError,
    } = this.props;

    return (
      <React.Fragment>
        <div className="content">
          <h2>Boards</h2>

          {
            boards.items.length > 0 ?
              <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable droppableId="boards">
                {provided => (
                    <ul ref={provided.innerRef} {...provided.droppableProps} className="boardsList">
                      {boards.items.map((board, i) => (
                        <BoardEditable
                          id={board.id}
                          name={board.name}
                          description={board.description}
                          index={i}
                          settingsAreUpdating={settingsAreUpdating}

                          handleUpdate={this.handleUpdate}
                          handleDelete={this.handleDelete}

                          key={board.id}
                        />
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
              </Droppable>
            </DragDropContext>
          :
            boards.areLoading ?
              <Spinner />
            :
              <CenteredMutedText>There are no boards. Create one below!</CenteredMutedText>
          }
        </div>

        <div className="content">
          <h2>New</h2>

          <BoardForm mode='create' handleSubmit={this.handleSubmit} />
        </div>

        <SiteSettingsInfoBox areUpdating={settingsAreUpdating || boards.areLoading} error={settingsError} />
      </React.Fragment>
    );
  }
}

export default BoardsSiteSettingsP;
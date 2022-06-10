import * as React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import I18n from 'i18n-js';

import BoardEditable from './BoardEditable';
import BoardForm from './BoardForm';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import Spinner from '../../common/Spinner';
import Box from '../../common/Box';
import { CenteredMutedText } from '../../common/CustomTexts';

import { BoardsState } from '../../../reducers/boardsReducer';
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
      <>
        <Box>
          <h2>{I18n.t('site_settings.boards.title')}</h2>

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
              <CenteredMutedText>{I18n.t('site_settings.boards.empty')}</CenteredMutedText>
          }
        </Box>

        <Box>
          <h2>{I18n.t('site_settings.boards.new')}</h2>

          <BoardForm mode='create' handleSubmit={this.handleSubmit} />
        </Box>

        <SiteSettingsInfoBox areUpdating={settingsAreUpdating || boards.areLoading} error={settingsError} />
      </>
    );
  }
}

export default BoardsSiteSettingsP;
import * as React from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import BoardEditable from './BoardEditable';
import SiteSettingsInfoBox from '../../shared/SiteSettingsInfoBox';
import Spinner from '../../shared/Spinner';
import { BoardsState } from '../../../reducers/boardsReducer';
import { CenteredMutedText } from '../../shared/CustomTexts';

interface Props {
  authenticityToken: string;

  boards: BoardsState;

  requestBoards(): void;
}

class BoardsSiteSettingsP extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestBoards();
  }

  handleDragEnd(result) {
    // if (result.destination == null || result.source.index === result.destination.index)
    //   return;
    
    // this.props.updatePostStatusOrder(
    //   parseInt(result.draggableId),
    //   this.props.postStatuses.items,
    //   result.source.index,
    //   result.destination.index,
    //   this.props.authenticityToken,
    // );
    return;
  }

  render() {
    const { boards } = this.props;

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

          { /* qui ci va il form */ }
        </div>

        <SiteSettingsInfoBox areUpdating={boards.areLoading} error={null} />
      </React.Fragment>
    );
  }
}

export default BoardsSiteSettingsP;
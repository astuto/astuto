import * as React from 'react';
import I18n from 'i18n-js';

import { Draggable } from 'react-beautiful-dnd';
import { DescriptionText } from '../../common/CustomTexts';

import DragZone from '../../common/DragZone';
import PostBoardLabel from '../../common/PostBoardLabel';
import Separator from '../../common/Separator';
import BoardForm from './BoardForm';

interface Props {
  id: number;
  name: string;
  description?: string;
  index: number;
  settingsAreUpdating: boolean;

  handleUpdate(
    id: number,
    description: string,
    name: string,
    onSuccess: Function,
  ): void;
  handleDelete(id: number): void;
}

interface State {
  editMode: boolean;
}

class BoardsEditable extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  toggleEditMode() {
    this.setState({editMode: !this.state.editMode});
  }

  handleUpdate(id: number, name: string, description: string) {
    this.props.handleUpdate(
      id,
      name,
      description,
      () => this.setState({editMode: false}),
    );
  }

  render() {
    const {
      id,
      name,
      description,
      index,
      settingsAreUpdating,
      handleDelete,
    } = this.props;
    const { editMode } = this.state;

    return (
      <Draggable key={id} draggableId={id.toString()} index={index} isDragDisabled={settingsAreUpdating}>
        {(provided, snapshot) => (
          <li className={`boardEditable${snapshot.isDragging ? ' dragging' : ''}`} ref={provided.innerRef} {...provided.draggableProps}>
            <DragZone dndProvided={provided} isDragDisabled={settingsAreUpdating} />

            { editMode === false ?
              <React.Fragment>
                <div className="boardInfo">
                  <div className="boardName">
                    <PostBoardLabel name={name} />
                  </div>
                  <div className="boardDescription">
                    <DescriptionText limit={80}>{description}</DescriptionText>
                  </div>
                </div>

                <div className="boardEditableActions">
                  <a onClick={this.toggleEditMode}>{I18n.t('common.buttons.edit')}</a>

                  <Separator />

                  <a
                    onClick={() => handleDelete(id)}
                    data-confirm="Are you sure?"
                  >
                    {I18n.t('common.buttons.delete')}
                  </a>
                </div>
              </React.Fragment>
            :
              <React.Fragment>
                <BoardForm
                  mode='update'
                  id={id}
                  name={name}
                  description={description}
                  handleUpdate={this.handleUpdate}
                />

                <a
                  className="boardFormCancelButton"
                  onClick={this.toggleEditMode}>
                  {I18n.t('common.buttons.cancel')}
                </a>
              </React.Fragment>
            }
          </li>
        )}
      </Draggable>
    );
  }
}  

export default BoardsEditable;
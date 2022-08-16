import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import I18n from 'i18n-js';

import PostStatusLabel from "../../common/PostStatusLabel";
import DragZone from '../../common/DragZone';
import Separator from '../../common/Separator';
import PostStatusForm from './PostStatusForm';
import ActionLink from '../../common/ActionLink';
import { CancelIcon, DeleteIcon, EditIcon } from '../../common/Icons';

interface Props {
  id: number;
  name: string;
  color: string;
  index: number;
  settingsAreUpdating: boolean;

  handleUpdate(
    id: number,
    name: string,
    color: string,
    onSuccess: Function,
  ): void;
  handleDelete(id: number): void;
}

interface State {
  editMode: boolean;
}

class PostStatusEditable extends React.Component<Props, State> {
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

  handleUpdate(id: number, name: string, color: string) {
    this.props.handleUpdate(
      id,
      name,
      color,
      () => this.setState({editMode: false}),
    );
  }

  render() {
    const {
      id,
      name,
      color,
      index,
      settingsAreUpdating,
      handleDelete
    } = this.props;
    const {editMode} = this.state;

    return (
      <Draggable key={id} draggableId={id.toString()} index={index} isDragDisabled={settingsAreUpdating}>
        {provided => (
          <li className="postStatusEditable" ref={provided.innerRef} {...provided.draggableProps}>
            <DragZone dndProvided={provided} isDragDisabled={settingsAreUpdating} />

            { editMode === false ?
              <>
                <PostStatusLabel name={name} color={color} />

                <div className="postStatusEditableActions">
                  <ActionLink onClick={this.toggleEditMode} icon={<EditIcon />}>
                    {I18n.t('common.buttons.edit')}
                  </ActionLink>

                  <ActionLink
                    onClick={() => confirm(I18n.t('common.confirmation')) && handleDelete(id)}
                    icon={<DeleteIcon />}
                  >
                    {I18n.t('common.buttons.delete')}
                  </ActionLink>
                </div>
              </>
            :
              <>
                <PostStatusForm
                  mode='update'
                  id={id}
                  name={name}
                  color={color}
                  handleUpdate={this.handleUpdate}
                />

                <ActionLink
                  onClick={this.toggleEditMode}
                  icon={<CancelIcon />}
                >
                  {I18n.t('common.buttons.cancel')}
                </ActionLink>
              </>
            }
          </li>
        )}
      </Draggable>
    );
  }
}  

export default PostStatusEditable;
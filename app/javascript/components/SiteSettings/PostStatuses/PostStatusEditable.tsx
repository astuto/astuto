import * as React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import PostStatusLabel from "../../shared/PostStatusLabel";
import DragZone from '../../shared/DragZone';
import Separator from '../../shared/Separator';
import PostStatusForm from './PostStatusForm';

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
    this.props.handleUpdate(id, name, color);
    this.setState({editMode: false});
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
              <React.Fragment>
                <PostStatusLabel name={name} color={color} />

                <div className="postStatusEditableActions">
                  <a onClick={this.toggleEditMode}>Edit</a>

                  <Separator />

                  <a
                    onClick={() => handleDelete(id)}
                    data-confirm="Are you sure?"
                  >
                    Delete
                  </a>
                </div>
              </React.Fragment>
            :
              <React.Fragment>
                <PostStatusForm
                  mode='update'
                  id={id}
                  name={name}
                  color={color}
                  handleUpdate={this.handleUpdate}
                />

                <a
                  className="postStatusFormCancelButton"
                  onClick={this.toggleEditMode}>
                  Cancel
                </a>
              </React.Fragment>
            }
          </li>
        )}
      </Draggable>
    );
  }
}  

export default PostStatusEditable;
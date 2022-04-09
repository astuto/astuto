import * as React from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { PostStatusesState } from "../../../reducers/postStatusesReducer";
import PostStatusEditable from './PostStatusEditable';

interface Props {
  authenticityToken: string;
  postStatuses: PostStatusesState;

  requestPostStatuses(): void;
}

class PostStatusesSiteSettingsP extends React.Component<Props> {
  componentDidMount() {
    this.props.requestPostStatuses();
  }

  handleDragEnd(result) {
    console.log(result);
  }

  render() {
    const { postStatuses } = this.props;
    
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="postStatuses">
          {provided => (
              <ul ref={provided.innerRef} {...provided.droppableProps} className="postStatusList">
                {postStatuses.items.map((postStatus, i) => (
                  <PostStatusEditable
                    id={postStatus.id}
                    name={postStatus.name}
                    color={postStatus.color}
                    index={i}

                    key={postStatus.id}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default PostStatusesSiteSettingsP;
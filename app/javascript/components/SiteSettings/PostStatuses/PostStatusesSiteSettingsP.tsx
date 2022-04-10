import * as React from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import IPostStatus from '../../../interfaces/IPostStatus';

import { PostStatusesState } from "../../../reducers/postStatusesReducer";
import PostStatusEditable from './PostStatusEditable';

interface Props {
  authenticityToken: string;
  postStatuses: PostStatusesState;

  requestPostStatuses(): void;
  updatePostStatusOrder(
    id: number,
    postStatuses: Array<IPostStatus>,
    sourceIndex: number,
    destinationIndex: number,
    authenticityToken: string,
  ): void;
}

class PostStatusesSiteSettingsP extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleDragEnd = this.handleDragEnd.bind(this);
  }
  
  componentDidMount() {
    this.props.requestPostStatuses();
  }

  handleDragEnd(result) {
    this.props.updatePostStatusOrder(
      parseInt(result.draggableId),
      this.props.postStatuses.items,
      result.source.index,
      result.destination.index,
      this.props.authenticityToken,
    );
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
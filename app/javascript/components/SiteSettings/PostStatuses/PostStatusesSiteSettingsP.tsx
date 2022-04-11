import * as React from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import IPostStatus from '../../../interfaces/IPostStatus';

import { PostStatusesState } from "../../../reducers/postStatusesReducer";
import SiteSettingsInfoBox from '../../shared/SiteSettingsInfoBox';
import PostStatusEditable from './PostStatusEditable';

interface Props {
  authenticityToken: string;
  postStatuses: PostStatusesState;
  settingsAreUpdating: boolean;
  settingsError: string;

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
    if (result.source.index === result.destination.index) return;
    
    this.props.updatePostStatusOrder(
      parseInt(result.draggableId),
      this.props.postStatuses.items,
      result.source.index,
      result.destination.index,
      this.props.authenticityToken,
    );
  }

  render() {
    const { postStatuses, settingsAreUpdating, settingsError } = this.props;
    
    return (
      <React.Fragment>
        <div className="content">
          <h2>Post statuses</h2>

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
                        settingsAreUpdating={settingsAreUpdating}

                        key={postStatus.id}
                      />
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
            </Droppable>
          </DragDropContext>
        </div>

        <SiteSettingsInfoBox areUpdating={settingsAreUpdating || postStatuses.areLoading} error={settingsError} />
      </React.Fragment>
    );
  }
}

export default PostStatusesSiteSettingsP;
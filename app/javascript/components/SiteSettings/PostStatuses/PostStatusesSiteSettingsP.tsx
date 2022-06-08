import * as React from 'react';
import I18n from 'i18n-js';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import IPostStatus from '../../../interfaces/IPostStatus';

import { PostStatusesState } from "../../../reducers/postStatusesReducer";
import { CenteredMutedText } from '../../common/CustomTexts';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import PostStatusForm from './PostStatusForm';
import PostStatusEditable from './PostStatusEditable';
import Spinner from '../../common/Spinner';
import Box from '../../common/Box';

interface Props {
  authenticityToken: string;
  postStatuses: PostStatusesState;
  settingsAreUpdating: boolean;
  settingsError: string;

  requestPostStatuses(): void;
  submitPostStatus(
    name: string,
    color: string,
    onSuccess: Function,
    authenticityToken: string,
  ): void;
  updatePostStatus(
    id: number,
    name: string,
    color: string,
    onSuccess: Function,
    authenticityToken: string,
  ): void;
  updatePostStatusOrder(
    id: number,
    postStatuses: Array<IPostStatus>,
    sourceIndex: number,
    destinationIndex: number,
    authenticityToken: string,
  ): void;
  deletePostStatus(id: number, authenticityToken: string): void;
}

class PostStatusesSiteSettingsP extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  componentDidMount() {
    this.props.requestPostStatuses();
  }

  handleSubmit(name: string, color: string, onSuccess: Function) {
    this.props.submitPostStatus(name, color, onSuccess, this.props.authenticityToken);
  }

  handleUpdate(id: number, name: string, color: string, onSuccess: Function) {
    this.props.updatePostStatus(id, name, color, onSuccess, this.props.authenticityToken);
  }

  handleDragEnd(result) {
    if (result.destination == null || result.source.index === result.destination.index)
      return;
    
    this.props.updatePostStatusOrder(
      parseInt(result.draggableId),
      this.props.postStatuses.items,
      result.source.index,
      result.destination.index,
      this.props.authenticityToken,
    );
  }

  handleDelete(id: number) {
    this.props.deletePostStatus(id, this.props.authenticityToken);
  }

  render() {
    const { postStatuses, settingsAreUpdating, settingsError } = this.props;
    
    return (
      <>
        <Box>
          <h2>{I18n.t('site_settings.post_statuses.title')}</h2>

          {
            postStatuses.items.length > 0 ?
              <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable droppableId="postStatuses">
                {provided => (
                    <ul ref={provided.innerRef} {...provided.droppableProps} className="postStatusesList">
                      {postStatuses.items.map((postStatus, i) => (
                        <PostStatusEditable
                          id={postStatus.id}
                          name={postStatus.name}
                          color={postStatus.color}
                          index={i}
                          settingsAreUpdating={settingsAreUpdating}

                          handleUpdate={this.handleUpdate}
                          handleDelete={this.handleDelete}

                          key={postStatus.id}
                        />
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
              </Droppable>
            </DragDropContext>
          :
            postStatuses.areLoading ?
              <Spinner />
            :
              <CenteredMutedText>{I18n.t('site_settings.post_statuses.empty')}</CenteredMutedText>
          }
        </Box>

        <Box>
          <h2>{I18n.t('site_settings.post_statuses.new')}</h2>

          <PostStatusForm mode='create' handleSubmit={this.handleSubmit} />
        </Box>

        <SiteSettingsInfoBox areUpdating={settingsAreUpdating || postStatuses.areLoading} error={settingsError} />
      </>
    );
  }
}

export default PostStatusesSiteSettingsP;
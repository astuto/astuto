import * as React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import I18n from 'i18n-js';

import Box from '../../common/Box';
import RoadmapEmbedding from './RoadmapEmbedding';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import RoadmapPostStatus from './RoadmapPostStatus';
import IPostStatus from '../../../interfaces/IPostStatus';
import { PostStatusesState } from "../../../reducers/postStatusesReducer";
import { MutedText } from '../../common/CustomTexts';

interface Props {
  embeddedRoadmapUrl: string,
  authenticityToken: string,
  postStatuses: PostStatusesState,
  settingsAreUpdating: boolean,
  settingsError: string,

  requestPostStatuses(): void;
  updatePostStatus(
    id: number,
    showInRoadmap: boolean,
    onComplete: Function,
    authenticityToken: string,
  ): void;
}

interface State {
  isDragging: number;
}

class RoadmapSiteSettingsP extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isDragging: null,
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.props.requestPostStatuses();
  }

  handleDragStart(result) {
    this.setState({ isDragging: parseInt(result.draggableId) });
  }

  handleDragEnd(result) {
    if (result.destination == null || result.source.droppableId === result.destination.droppableId) {
      this.setState({ isDragging: null });
      return;
    }

    this.props.updatePostStatus(
      result.draggableId,
      result.destination.droppableId === 'statusesInRoadmap',
      () => this.setState({ isDragging: null }),
      this.props.authenticityToken,
    );
  }

  // Workaround needed because after dropping a post status, the state is not yet updated
  // with the new showInRoadmap value (we need to wait POSTSTATUS_UPDATE_SUCCESS dispatch)
  // and the UI would flicker, moving the poststatus back in its original spot
  placeDraggingStatusDuringUpdate(statusesInRoadmap: IPostStatus[], statusesNotInRoadmap: IPostStatus[]) {
    const { postStatuses } = this.props;
    const movedPostStatus = postStatuses.items.find(postStatus => postStatus.id === this.state.isDragging);
    
    if (movedPostStatus.showInRoadmap) {
      statusesInRoadmap = statusesInRoadmap.filter(postStatus => postStatus.id !== this.state.isDragging);
      statusesNotInRoadmap.push(movedPostStatus);
      statusesNotInRoadmap.sort((ps1, ps2) => ps1.order - ps2.order);
    } else {
      statusesNotInRoadmap = statusesNotInRoadmap.filter(postStatus => postStatus.id !== this.state.isDragging);
      statusesInRoadmap.push(movedPostStatus);
      statusesInRoadmap.sort((ps1, ps2) => ps1.order - ps2.order);
    }

    return [statusesInRoadmap, statusesNotInRoadmap];
  }

  render() {
    const { embeddedRoadmapUrl, postStatuses, settingsAreUpdating, settingsError } = this.props;
    const { isDragging } = this.state;

    let statusesInRoadmap = postStatuses.items.filter(postStatus => postStatus.showInRoadmap);
    let statusesNotInRoadmap = postStatuses.items.filter(postStatus => !postStatus.showInRoadmap);

    if (settingsAreUpdating && this.state.isDragging) {
      [statusesInRoadmap, statusesNotInRoadmap] = this.placeDraggingStatusDuringUpdate(statusesInRoadmap, statusesNotInRoadmap);
    }

    return (
      <DragDropContext onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
        <Box>
          <h2>{I18n.t('site_settings.roadmap.title')}</h2>

          <Droppable droppableId="statusesInRoadmap" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`inRoadmapPostStatuses roadmapPostStatuses${isDragging ? ' isDraggingSomething' : ''}${snapshot.isDraggingOver ? ' isDraggingOver' : ''}`}
                {...provided.droppableProps}
              >
                {statusesInRoadmap.map((postStatus, i) => (
                  <RoadmapPostStatus
                    id={postStatus.id}
                    name={postStatus.name}
                    color={postStatus.color}
                    index={i}
                    settingsAreUpdating={settingsAreUpdating}

                    key={postStatus.id}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {
            statusesInRoadmap.length > 0 ?
              null
            :
              <MutedText>{I18n.t('site_settings.roadmap.empty')}</MutedText>
          }
          <MutedText>{I18n.t('site_settings.roadmap.help')}</MutedText>
        </Box>

        <Box>
          <h2>{I18n.t('site_settings.roadmap.title2')}</h2>

          <Droppable droppableId="statusesNotInRoadmap" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`notInRoadmapPostStatuses roadmapPostStatuses${isDragging ? ' isDraggingSomething' : ''}${snapshot.isDraggingOver ? ' isDraggingOver' : ''}`}
                {...provided.droppableProps}
              >
                {statusesNotInRoadmap.map((postStatus, i) => (
                  <RoadmapPostStatus
                    id={postStatus.id}
                    name={postStatus.name}
                    color={postStatus.color}
                    index={i}
                    settingsAreUpdating={settingsAreUpdating}
                    headerOnly

                    key={postStatus.id}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Box>

        <RoadmapEmbedding embeddedRoadmapUrl={embeddedRoadmapUrl} />

        <SiteSettingsInfoBox areUpdating={settingsAreUpdating || postStatuses.areLoading} error={settingsError} />
      </DragDropContext>
    );
  }
}

export default RoadmapSiteSettingsP;
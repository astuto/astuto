import * as React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import I18n from 'i18n-js';

import { PostStatusesState } from "../../../reducers/postStatusesReducer";
import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';
import RoadmapPostStatus from './RoadmapPostStatus';

interface Props {
  authenticityToken: string,
  postStatuses: PostStatusesState,
  settingsAreUpdating: boolean,
  settingsError: string,

  requestPostStatuses(): void;
  updatePostStatus(
    id: number,
    showInRoadmap: boolean,
    authenticityToken: string,
  ): void;
}

interface State {
  isDragging: boolean;
}

class RoadmapSiteSettingsP extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isDragging: false,
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.props.requestPostStatuses();
  }

  handleDragStart() {
    this.setState({isDragging: true});
  }

  handleDragEnd(result) {
    this.setState({isDragging: false});

    if (result.destination == null || result.source.droppableId === result.destination.droppableId)
      return;

    this.props.updatePostStatus(
      result.draggableId,
      result.destination.droppableId === 'statusesInRoadmap',
      this.props.authenticityToken,
    );
  }

  render() {
    const { postStatuses, settingsAreUpdating, settingsError } = this.props;
    const { isDragging } = this.state;

    const statusesInRoadmap = postStatuses.items.filter(postStatus => postStatus.showInRoadmap);
    const statusesNotInRoadmap = postStatuses.items.filter(postStatus => !postStatus.showInRoadmap);

    return (
      <DragDropContext onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
        <Box>
          <h2>{I18n.t('site_settings.roadmap.title')}</h2>

          <Droppable droppableId="statusesInRoadmap" direction="horizontal">
            {provided => (
              <div
                ref={provided.innerRef}
                className={`roadmapPostStatuses${isDragging ? ' isDragging' : ''}`}
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
        </Box>

        <Box>
          <h2>{I18n.t('site_settings.roadmap.title2')}</h2>

          <Droppable droppableId="statusesNotInRoadmap" direction="horizontal">
            {provided => (
              <div
                ref={provided.innerRef}
                className={`roadmapPostStatuses${isDragging ? ' isDragging' : ''}`}
                {...provided.droppableProps}
              >
                {statusesNotInRoadmap.map((postStatus, i) => (
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
        </Box>

        <SiteSettingsInfoBox areUpdating={settingsAreUpdating || postStatuses.areLoading} error={settingsError} />
      </DragDropContext>
    );
  }
}

export default RoadmapSiteSettingsP;
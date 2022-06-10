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
};

class RoadmapSiteSettingsP extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.props.requestPostStatuses();
  }

  handleDragEnd() {

  }

  render() {
    const { postStatuses, settingsAreUpdating, settingsError } = this.props;

    const statusesInRoadmap = postStatuses.items.filter(postStatus => postStatus.showInRoadmap);
    const statusesNotInRoadmap = postStatuses.items.filter(postStatus => !postStatus.showInRoadmap);

    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Box>
          <h2>{I18n.t('site_settings.roadmap.title')}</h2>

          <Droppable droppableId="statusesInRoadmap" direction="horizontal">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="roadmapPostStatuses">
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
        </Box>

        <SiteSettingsInfoBox areUpdating={settingsAreUpdating || postStatuses.areLoading} error={settingsError} />
      </DragDropContext>
    );
  }
}

export default RoadmapSiteSettingsP;
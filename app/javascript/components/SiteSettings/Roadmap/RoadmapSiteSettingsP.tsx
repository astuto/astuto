import * as React from 'react';
import I18n from 'i18n-js';

import { PostStatusesState } from "../../../reducers/postStatusesReducer";
import Box from '../../common/Box';
import SiteSettingsInfoBox from '../../common/SiteSettingsInfoBox';

interface Props {
  authenticityToken: string,
  postStatuses: PostStatusesState,
  settingsAreUpdating: boolean,
  settingsError: string,

  requestPostStatuses(): void;
};

class RoadmapSiteSettingsP extends React.Component<Props> {
  componentDidMount() {
    this.props.requestPostStatuses();
  }

  render() {
    const { postStatuses, settingsAreUpdating, settingsError } = this.props;

    return (
      <>
        <Box>
          <h2>{I18n.t('site_settings.roadmap.title')}</h2>
        </Box>

        <Box>
          <h2>{I18n.t('site_settings.roadmap.title2')}</h2>
        </Box>

        <SiteSettingsInfoBox areUpdating={settingsAreUpdating || postStatuses.areLoading} error={settingsError} />
      </>
    );
  }
}

export default RoadmapSiteSettingsP;
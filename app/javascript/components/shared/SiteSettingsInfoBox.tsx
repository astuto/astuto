import * as React from 'react';

import Spinner from './Spinner';

interface Props {
  areUpdating: boolean;
  error: string;
}

const SiteSettingsInfoBox = ({ areUpdating, error }: Props) => (
  <div className="content siteSettingsInfo">
  {
    areUpdating ?
      <Spinner />
    :
      error ?
        <span className="error">An error occurred: {JSON.stringify(error)}</span>
      :
        <span>Everything up to date</span>
  }
  </div>
);

export default SiteSettingsInfoBox;
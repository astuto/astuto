import * as React from 'react';
import I18n from 'i18n-js';

const PoweredByLink = () => (
  <div className="poweredBy">
    <a href="http://astuto.io/" target="_blank">
      { I18n.t('common.powered_by') } Astuto
    </a>
  </div>
);

export default PoweredByLink;
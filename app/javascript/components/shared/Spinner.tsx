import * as React from 'react';
import I18n from 'i18n-js';

const Spinner = ({ color = 'dark' }) => (
  <div className={`spinner-grow d-block mx-auto text-${color}`} role="status">
    <span className="sr-only">{I18n.t('common.loading')}</span>
  </div>
);

export default Spinner;
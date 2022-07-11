import * as React from 'react';
import I18n from 'i18n-js';

import Box from '../common/Box';

const TenantSignUpForm = () => (
  <Box customClass="tenantSignUpStep2">
    <h3>{ I18n.t('signup.step2.title') }</h3>
  </Box>
);

export default TenantSignUpForm;
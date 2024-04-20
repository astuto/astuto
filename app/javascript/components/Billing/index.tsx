import * as React from 'react';
import I18n from 'i18n-js';

import ITenantBilling, { TENANT_BILLING_STATUS_TRIAL } from '../../interfaces/ITenantBilling';
import Box from '../common/Box';

interface Props {
  tenantBilling: ITenantBilling;
}

class Billing extends React.Component<Props> {
  render() {
    const { tenantBilling } = this.props;

    return (
      <Box>
        <h2>{ I18n.t('billing.title') }</h2>

        <br />

        <p>Plan: <span className="billingStatusBadge">{tenantBilling.status}</span></p>

        {
          tenantBilling.status === TENANT_BILLING_STATUS_TRIAL && 
            <p>Trial ends: {new Date(tenantBilling.trial_ends_at).toLocaleString(undefined, {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
        }
      </Box>
    );
  }
}

export default Billing;
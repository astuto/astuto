import * as React from 'react';
import { useEffect, useState } from "react";
import Box from '../common/Box';
import ActionLink from '../common/ActionLink';
import { BackIcon } from '../common/Icons';
import ITenantBilling from '../../interfaces/ITenantBilling';

interface Props {
  tenantBilling: ITenantBilling;
  homeUrl: string;
  billingUrl: string;
}

const Return = ({ tenantBilling, homeUrl, billingUrl }: Props) => {
  const [status, setStatus] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/session_status?session_id=${sessionId}&tenant_id=${tenantBilling.slug}`)
      .then(res => res.json())
      .then(data => {
        setStatus(data.status);
        setSession(data.session);
      });
  }, []);

  if (status === 'open') {
    return (
      <Box customClass="billingContainer">
        <h2>Error</h2>
        <p>Unfortunately, there was an error processing your payment. Please try again.</p>

        <ActionLink onClick={() => window.location.href = billingUrl} icon={<BackIcon />}>
          Back to billing
        </ActionLink>
      </Box>
    )
  }

  if (status === 'complete') {
    return (
      <Box customClass="billingContainer">
        <h2>Success!</h2>
        <p>Thank you for choosing Astuto! Your subscription will be activated shortly.</p>
        
        <ActionLink onClick={() => window.location.href = homeUrl} icon={<BackIcon />}>
          Back to home
        </ActionLink>
      </Box>
    )
  }

  return null;
}

export default Return;
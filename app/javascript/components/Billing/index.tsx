import * as React from 'react';
import I18n from 'i18n-js';
import { loadStripe } from '@stripe/stripe-js';

import ITenantBilling, { TENANT_BILLING_STATUS_CANCELED, TENANT_BILLING_STATUS_TRIAL } from '../../interfaces/ITenantBilling';
import Box from '../common/Box';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import buildRequestHeaders from '../../helpers/buildRequestHeaders';

interface Props {
  tenantBilling: ITenantBilling;
  prices: Array<any>;
  stripePublicKey: string;
  authenticityToken: string;
}

const stripePromise = loadStripe('pk_test_51P7Hdw073bx1HD5Nk1sVrAGm1r7TWXUdZTEUKIMe558TQtQHEvy0rRuWRc33RVsbCMoZjar5vazbiXB200f6qEB000xIdkRMA3');

const Billing = ({ tenantBilling, prices, authenticityToken }: Props) => {
  const [chosenPrice, setChosenPrice] = React.useState(null);

  const fetchClientSecret = React.useCallback(() => {
    // Create a Checkout Session
    return fetch(`/create_checkout_session?price_id=${chosenPrice}`, {
      method: "POST",
      headers: buildRequestHeaders(authenticityToken),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [chosenPrice]);

  const options = {fetchClientSecret};

  return (
    <Box customClass="billingContainer">
      <h2>{ I18n.t('billing.title') }</h2>

      <br />

      <p>Plan: <span className="billingStatusBadge">{tenantBilling.status}</span></p>

      {
        tenantBilling.status === TENANT_BILLING_STATUS_TRIAL && 
          <p>Trial ends: {new Date(tenantBilling.trial_ends_at).toLocaleString(undefined, {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
      }

      {
        (tenantBilling.status === TENANT_BILLING_STATUS_TRIAL || tenantBilling.status === TENANT_BILLING_STATUS_CANCELED) &&
          <div className="pricingTable">
          {
            prices && prices.map((price) => (
              <div key={price.id} className="pricingTableColumn">
                <h3>{ price.lookup_key === 'monthly' ? 'Monthly Subscription' : 'Yearly Subscription' }</h3>
                <p className="price">{price.unit_amount / 100.0} {price.currency}</p>
                <button onClick={() => setChosenPrice(price.id)} className="btnPrimary">Choose</button>
              </div>
            ))
          }
          </div>
      }

      {
        chosenPrice &&
          <div id="checkout">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={options}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
      }
    </Box>
  );
}

export default Billing;
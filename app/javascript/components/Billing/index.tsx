import * as React from 'react';
import I18n from 'i18n-js';
import { loadStripe } from '@stripe/stripe-js';

import ITenantBilling, { TENANT_BILLING_STATUS_ACTIVE, TENANT_BILLING_STATUS_CANCELED, TENANT_BILLING_STATUS_TRIAL } from '../../interfaces/ITenantBilling';
import Box from '../common/Box';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import buildRequestHeaders from '../../helpers/buildRequestHeaders';
import { SmallMutedText } from '../common/CustomTexts';
import ActionLink from '../common/ActionLink';
import { LearnMoreIcon } from '../common/Icons';

interface Props {
  tenantBilling: ITenantBilling;
  prices: Array<any>;
  manageSubscriptionUrl: string;
  authenticityToken: string;
}

const stripePromise = loadStripe('pk_test_51P7Hdw073bx1HD5Nk1sVrAGm1r7TWXUdZTEUKIMe558TQtQHEvy0rRuWRc33RVsbCMoZjar5vazbiXB200f6qEB000xIdkRMA3');

const Billing = ({ tenantBilling, prices, manageSubscriptionUrl, authenticityToken }: Props) => {
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

  const currentTime = new Date();
  const trialEndsAt = new Date(tenantBilling.trial_ends_at);
  const trialEndsAtFormatted = trialEndsAt.toLocaleString(undefined, {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'});
  const subscriptionEndsAt = new Date(tenantBilling.subscription_ends_at);
  const subscriptionEndsAtFormatted = subscriptionEndsAt.toLocaleString(undefined, {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'});

  const isExpired = (
    (tenantBilling.status === TENANT_BILLING_STATUS_TRIAL && trialEndsAt < currentTime) ||
    ((tenantBilling.status === TENANT_BILLING_STATUS_ACTIVE || tenantBilling.status === TENANT_BILLING_STATUS_CANCELED) && subscriptionEndsAt < currentTime)
  );

  return (
    <Box customClass="billingContainer">
      <h2>{ I18n.t('billing.title') }</h2>

      <p>
        <span className="billingStatusBadge">{tenantBilling.status}</span>
        { isExpired && <span className="billingStatusBadge billingStatusBadgeExpired">Expired</span> }
      </p>

      {
        tenantBilling.status === TENANT_BILLING_STATUS_TRIAL && 
          <p>Trial {isExpired ? 'expired' : 'expires'} on <b>{trialEndsAtFormatted}</b></p>
      }

      {
        tenantBilling.status === TENANT_BILLING_STATUS_TRIAL && isExpired &&
          <p>Your trial has expired. Please choose a subscription plan to continue using the service.</p>
      }

      {
        tenantBilling.status === TENANT_BILLING_STATUS_ACTIVE &&
          <p>Subscription {isExpired ? 'expired' : 'renews'} on {subscriptionEndsAtFormatted}</p>
      }

      {
        tenantBilling.status === TENANT_BILLING_STATUS_ACTIVE && isExpired &&
          <p>Your subscription has expired because automatic renewal failed. Please update your payment details by managing your subscription.</p>
      }

      {
        tenantBilling.status === TENANT_BILLING_STATUS_CANCELED &&
          <p>Subscription {isExpired ? 'expired' : 'expires'} on {subscriptionEndsAtFormatted}</p>
      }

      {
        (tenantBilling.status === TENANT_BILLING_STATUS_TRIAL) &&
          <div className="pricingTable">
          {
            prices && prices.map((price) => (
              <div key={price.id} className="pricingTableColumn">
                <h3>{ price.lookup_key === 'monthly' ? 'Monthly subscription' : 'Yearly subscription' }</h3>
                <p className="price">{price.unit_amount / 100.0} {price.currency}</p>
                <button onClick={() => setChosenPrice(price.id)} className="btnPrimary">Subscribe</button>
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

      {
        (tenantBilling.status === TENANT_BILLING_STATUS_ACTIVE || tenantBilling.status === TENANT_BILLING_STATUS_CANCELED) &&
          <div className="billingAction">
            <button className="btnPrimary" onClick={() => window.open(manageSubscriptionUrl, '_blank')}>
              Manage subscription
            </button>
            <SmallMutedText>
              You will be redirected to Stripe, our billing partner.
            </SmallMutedText>
          </div>
      }

      <div className="billingUsefulLinks">
        <ActionLink onClick={() => window.open('https://astuto.io/terms-of-service', '_blank')} icon={<LearnMoreIcon />}>
          Terms of Service
        </ActionLink>

        <ActionLink onClick={() => window.open('https://astuto.io/privacy-policy', '_blank')} icon={<LearnMoreIcon />}>
          Privacy Policy
        </ActionLink>
      </div>
    </Box>
  );
}

export default Billing;
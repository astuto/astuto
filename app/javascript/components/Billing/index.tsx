import * as React from 'react';
import I18n from 'i18n-js';
import { loadStripe } from '@stripe/stripe-js';

import ITenantBilling, { TENANT_BILLING_STATUS_ACTIVE, TENANT_BILLING_STATUS_CANCELED, TENANT_BILLING_STATUS_TRIAL } from '../../interfaces/ITenantBilling';
import Box from '../common/Box';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import buildRequestHeaders from '../../helpers/buildRequestHeaders';
import { SmallMutedText } from '../common/CustomTexts';
import ActionLink from '../common/ActionLink';
import { BackIcon, LearnMoreIcon } from '../common/Icons';
import PricingTable from './PricingTable';

interface Props {
  tenantBilling: ITenantBilling;
  prices: Array<any>;
  createCheckoutSessionUrl: string;
  billingUrl: string;
  manageSubscriptionUrl: string;
  stripeMonthlyLookupKey: string;
  stripeYearlyLookupKey: string;
  stripePublicKey: string;
  authenticityToken: string;
}

const Billing = ({
  tenantBilling,
  prices,
  createCheckoutSessionUrl,
  billingUrl,
  manageSubscriptionUrl,
  stripeMonthlyLookupKey,
  stripeYearlyLookupKey,
  stripePublicKey,
  authenticityToken,
}: Props) => {
  const [stripePromise, setStripePromise] = React.useState(null);
  const [currentPrice, setCurrentPrice] = React.useState(null);
  const [chosenPrice, setChosenPrice] = React.useState(null);
  const [showBackLink, setShowBackLink] = React.useState(false);

  React.useEffect(() => {
    setStripePromise(loadStripe(stripePublicKey));
  }, []);

  React.useEffect(() => {
    if (prices && prices.length > 0) {
      setCurrentPrice(prices[0].id);
    }
  }, [prices]);

  const fetchClientSecret = React.useCallback(() => {
    // Create a Checkout Session
    return fetch(`${createCheckoutSessionUrl}?price_id=${chosenPrice}&tenant_id=${tenantBilling.slug}`, {
      method: "POST",
      headers: buildRequestHeaders(authenticityToken),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [chosenPrice]);

  React.useEffect(() => {
    if (chosenPrice) {
      const timer = setTimeout(() => {
        setShowBackLink(true);
      }, 5000);
  
      return () => clearTimeout(timer); // cleanup on unmount or when chosenPrice changes
    } else {
      setShowBackLink(false); // reset state when chosenPrice becomes null
    }
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
        (tenantBilling.status === TENANT_BILLING_STATUS_TRIAL) && chosenPrice === null &&
          <PricingTable
            prices={prices}
            currentPrice={currentPrice}
            setCurrentPrice={setCurrentPrice}
            setChosenPrice={setChosenPrice}
            stripeMonthlyLookupKey={stripeMonthlyLookupKey}
            stripeYearlyLookupKey={stripeYearlyLookupKey}
          />
      }

      {
        chosenPrice &&
          <div className="checkoutContainer">
            { showBackLink ?
              <ActionLink onClick={() => window.location.href = billingUrl} icon={<BackIcon />}>
                Choose another plan
              </ActionLink>
              :
              <br />
            }

            <div id="checkout">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
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
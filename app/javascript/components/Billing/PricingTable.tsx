import * as React from 'react';

interface Props {
  prices: Array<any>;
  currentPrice: string;
  setCurrentPrice: (priceId: string) => void;
  setChosenPrice: (priceId: string) => void;
  stripeMonthlyLookupKey: string;
  stripeYearlyLookupKey: string;
}

const PricingTable = ({
  prices,
  currentPrice,
  setCurrentPrice,
  setChosenPrice,
  stripeMonthlyLookupKey,
  stripeYearlyLookupKey,
}: Props) => {
  const monthlyPlanUnitAmount = prices.find(p => p.lookup_key === stripeMonthlyLookupKey).unit_amount;
  const yearlyPlanUnitAmount = prices.find(p => p.lookup_key === stripeYearlyLookupKey).unit_amount;
  const yearlyPlanDiscount = 1 - yearlyPlanUnitAmount / (monthlyPlanUnitAmount*12)

  return (
    <div className="pricingTable">
      <h3>Choose your plan</h3>

      <ul className="pricingPlansNav">
        {
          prices && prices.map((price) => (
            <li key={price.id} className="nav-item">
              <a className={`nav-link${currentPrice === price.id ? ' active' : ''}`} onClick={() => setCurrentPrice(price.id)}>
                {price.lookup_key}
                { 
                  price.lookup_key === stripeYearlyLookupKey &&
                    <span className="yearlyPlanDiscount">-{yearlyPlanDiscount * 100}%</span>
                }
              </a>
            </li>
          ))
        }
      </ul>
    {
      prices && prices.filter(price => price.id === currentPrice).map((price) => (
        <div key={price.id} className="pricingTableColumn">
          <h4>{ price.lookup_key === stripeMonthlyLookupKey ? 'Monthly subscription' : 'Yearly subscription' }</h4>

          <div className="priceContainer">
            <p className="price">
              <span className="amount">{price.unit_amount / 100.0}</span>
              &nbsp;
              <span className="currency">{price.currency}</span>
              &nbsp;/&nbsp;
              <span className="period">{price.recurring.interval}</span>
            </p>

            {
              price.lookup_key === stripeYearlyLookupKey &&
                <p className="priceYearly">
                  (
                  <span className="amount">{price.unit_amount / 100.0 / 12}</span>
                  &nbsp;
                  <span className="currency">{price.currency}</span>
                  &nbsp;/&nbsp;
                  <span className="period">month</span>
                  )
                </p>
            }
          </div>

          <p className="description">
            For most small-medium organizations.<br />
            Bigger organizations can <a className="link" href="mailto:info@astuto.io">contact us</a> for a custom plan.
          </p>

          <ul className="features">
            <li>All features</li>
            <li>Unlimited feedback</li>
            <li>Unlimited boards</li>
          </ul>

          <button onClick={() => setChosenPrice(price.id)} className="btnPrimary">Subscribe</button>
        </div>
      ))
    }
    </div>
  );
};

export default PricingTable;
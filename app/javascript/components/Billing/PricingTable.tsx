import * as React from 'react';

interface Props {
  prices: Array<any>;
  currentPrice: string;
  setCurrentPrice: (priceId: string) => void;
  setChosenPrice: (priceId: string) => void;
}

const PricingTable = ({ prices, currentPrice, setCurrentPrice, setChosenPrice }: Props) => (
  <div className="pricingTable">
    <h3>Choose your plan</h3>

    <ul className="pricingPlansNav">
      {
        prices && prices.map((price) => (
          <li key={price.id} className="nav-item">
            <a className={`nav-link${currentPrice === price.id ? ' active' : ''}`} onClick={() => setCurrentPrice(price.id)}>
              {price.lookup_key}
              { 
                price.lookup_key === 'yearly' &&
                  <span className="yearlyPlanDiscount">-{(1 - ((prices.find(p => p.lookup_key === 'yearly').unit_amount) / (prices.find(p => p.lookup_key === 'monthly').unit_amount*12))) * 100}%</span>
              }
            </a>
          </li>
        ))
      }
    </ul>
  {
    prices && prices.filter(price => price.id === currentPrice).map((price) => (
      <div key={price.id} className="pricingTableColumn">
        <h4>{ price.lookup_key === 'monthly' ? 'Monthly subscription' : 'Yearly subscription' }</h4>

        <div className="priceContainer">
          <p className="price">
            <span className="amount">{price.unit_amount / 100.0}</span>
            &nbsp;
            <span className="currency">{price.currency}</span>
            &nbsp;/&nbsp;
            <span className="period">{price.recurring.interval}</span>
          </p>

          {
            price.lookup_key === 'yearly' &&
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

export default PricingTable;
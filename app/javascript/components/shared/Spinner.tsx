import * as React from 'react';

const Spinner = ({ color = 'dark' }) => (
  <div className={`spinner-grow d-block mx-auto text-${color}`} role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

export default Spinner;
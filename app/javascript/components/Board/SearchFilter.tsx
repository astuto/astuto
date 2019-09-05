import * as React from 'react';

interface Props {
  searchQuery: string;
  handleChange(newSearchQuery: string): void;
}

const SearchFilter = ({ searchQuery, handleChange }: Props) => (
  <div className="box sidebar-box">
    <label htmlFor="searchPostInput" className="smallTitle">Search:</label>
    <input
      type="text"
      onChange={e => handleChange(e.target.value)}
      id="searchPostInput"
      className="form-control"
    />
  </div>
);

export default SearchFilter;
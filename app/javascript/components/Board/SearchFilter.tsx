import * as React from 'react';

import { BoxTitleText } from '../shared/CustomTexts';

interface Props {
  searchQuery: string;
  handleChange(newSearchQuery: string): void;
}

const SearchFilter = ({ searchQuery, handleChange }: Props) => (
  <div className="sidebarCard">
    <BoxTitleText>Search</BoxTitleText>

    <input
      type="search"
      value={searchQuery}
      onChange={e => handleChange(e.target.value)}
      id="searchPostInput"
      className="form-control"
    />
  </div>
);

export default SearchFilter;
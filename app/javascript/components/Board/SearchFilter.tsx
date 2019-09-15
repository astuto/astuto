import * as React from 'react';

import { TitleText } from '../shared/CustomTexts';

interface Props {
  searchQuery: string;
  handleChange(newSearchQuery: string): void;
}

const SearchFilter = ({ searchQuery, handleChange }: Props) => (
  <div className="sidebarBox">
    <TitleText>Search:</TitleText>
    <input
      type="search"
      onChange={e => handleChange(e.target.value)}
      id="searchPostInput"
      className="form-control"
    />
  </div>
);

export default SearchFilter;
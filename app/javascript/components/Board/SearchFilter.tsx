import * as React from 'react';

import { TitleText } from '../shared/CustomTexts';

import I18n from 'i18n-js';

interface Props {
  searchQuery: string;
  handleChange(newSearchQuery: string): void;
}

const SearchFilter = ({ searchQuery, handleChange }: Props) => (
  <div className="sidebarCard">
    <TitleText>{I18n.t('javascript.components.board.search_filter.search')}</TitleText>
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
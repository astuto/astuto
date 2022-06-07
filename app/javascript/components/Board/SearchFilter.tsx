import * as React from 'react';
import I18n from 'i18n-js';

import SidebarBox from '../common/SidebarBox';

interface Props {
  searchQuery: string;
  handleChange(newSearchQuery: string): void;
}

const SearchFilter = ({ searchQuery, handleChange }: Props) => (
  <SidebarBox title={I18n.t('board.search_box.title')}>
    <input
      type="search"
      value={searchQuery}
      onChange={e => handleChange(e.target.value)}
      id="searchPostInput"
      className="form-control"
    />
  </SidebarBox>
);

export default SearchFilter;
import * as React from 'react';
import I18n from 'i18n-js';

import SidebarBox from '../common/SidebarBox';
import { SortByFilterValues } from '../../actions/changeFilters';

interface Props {
  sortBy: SortByFilterValues;
  handleChange(newSortBy: SortByFilterValues): void;
}

const SortByFilter = ({ sortBy, handleChange }: Props) => (
  <SidebarBox title={I18n.t('board.sort_by_box.title')}>
    <select
      value={sortBy}
      onChange={e => handleChange(e.target.value as SortByFilterValues)}
      id="sortBySelect"
      className="form-control"
    >
      <option value="trending">{I18n.t('board.sort_by_box.trending')}</option>
      <option value="newest">{I18n.t('board.sort_by_box.newest')}</option>
      <option value="most_voted">{I18n.t('board.sort_by_box.most_voted')}</option>
      <option value="oldest">{I18n.t('board.sort_by_box.oldest')}</option>
    </select>
  </SidebarBox>
);

export default SortByFilter;
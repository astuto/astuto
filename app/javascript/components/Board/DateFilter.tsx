import * as React from 'react';
import I18n from 'i18n-js';

import SidebarBox from '../common/SidebarBox';
import ActionLink from '../common/ActionLink';
import { ClearIcon } from '../common/Icons';

interface Props {
  startDate: string;
  endDate: string;
  handleChange(startDate: string, endDate: string): void;
}

const DateFilter = ({ startDate, endDate, handleChange }: Props) => (
  <SidebarBox title={I18n.t('board.filter_by_date_box.title')} customClass="dateFilterBox">
    <label htmlFor="startDateFilter">
      { I18n.t('board.filter_by_date_box.from_label') }
    </label>
    <input
      type="date"
      value={startDate}
      onChange={e => handleChange(e.target.value, endDate)}
      id="startDateFilter"
      className="form-control"
    />

    <label htmlFor="endDateFilter">
      { I18n.t('board.filter_by_date_box.to_label') }
    </label>
    <input
      type="date"
      value={endDate}
      onChange={e => handleChange(startDate, e.target.value)}
      id="endDateFilter"
      className="form-control"
    />

    {
      startDate || endDate ?
        <ActionLink
          onClick={() => handleChange('', '')}
          icon={<ClearIcon />}
          customClass="clearDateFilter"
        >
          { I18n.t('common.buttons.clear') }
        </ActionLink>
      :
        null
    }
  </SidebarBox>
);

export default DateFilter;
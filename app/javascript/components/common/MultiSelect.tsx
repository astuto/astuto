import * as React from 'react';
import I18n from 'i18n-js';
import Select, { components } from 'react-select';

export type MultiSelectOption = {
  value: number;
  label: string;
  color?: string;
};

interface Props {
  options: Array<MultiSelectOption>;
  defaultValue: Array<MultiSelectOption>;
  onChange: (selectedOptions: Array<MultiSelectOption>) => void;
  className?: string;
}

const MultiSelect = ({
  options,
  defaultValue,
  onChange,
  className,
}: Props) => {
  return (
    <Select
      isMulti
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
      className={className}
      hideSelectedOptions={false}
      isClearable={false}
      isSearchable
      noOptionsMessage={() => I18n.t('common.select_no_options_available')}
      placeholder={I18n.t('common.select_placeholder')}
      styles={{
        control: (provided, state) => ({
          ...provided,
          boxShadow: 'none',
          borderColor: state.isFocused ? '#333333' : '#cdcdcd',
          '&:hover': {
            boxShadow: 'none',
            borderColor: '#333333',
          },
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#e5e5e5' : 'white',
          color: state.isSelected ? '#333333' : 'inherit',
          '&:hover': {
            backgroundColor: '#333333',
            color: 'white',
          },
        }),
      }}
    />
  );
}

export default MultiSelect;
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

const SELECTED_COLOR = '#e5e5e5';

const ColoredOption = props => {
  return (
    <components.Option {...props}>
      <span style={{ backgroundColor: props.data.color, color: 'white', padding: '4px', borderRadius: '4px' }}>
        {props.data.label}
      </span>
    </components.Option>
  );
};

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
      components={{ Option: (options && options.length > 0 && 'color' in options[0]) ? ColoredOption : components.Option }}
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
          backgroundColor: state.isSelected ? SELECTED_COLOR : 'white',
          color: state.isSelected ? '#333333' : 'inherit',
          '&:hover': {
            filter: 'brightness(0.8)',
          },
          '&:active': {
            backgroundColor: SELECTED_COLOR,
          },
        }),
        multiValue: (provided, state) => {
          return {
            ...provided,
            marginRight: '4px',
          };
        },
        multiValueLabel: (provided, state) => {
          const option = options.find(opt => opt.value === state.data.value);
          return {
            ...provided,
            backgroundColor: option.color ? option.color : 'inherit',
            color: option.color ? 'white' : 'inherit',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
          };
        },
        multiValueRemove: (provided, state) => {
          const option = options.find(opt => opt.value === state.data.value);
            return {
            ...provided,
            backgroundColor: option.color ? option.color : 'inherit',
            color: option.color ? 'white' : 'inherit',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            '&:hover': {
              backgroundColor: option.color ? option.color : '#fbfbfb',
              color: option.color ? 'white' : 'inherit',
              filter: 'brightness(0.8)',
            },
            };
        },
      }}
    />
  );
}

export default MultiSelect;
import React from 'react';
import Select from 'react-select';
import { FiltersTitle } from './StyledFilters';

/**
 * Displays a select filter and sends state back to parent in a callback.
 *
 */
const SelectFilter = ({ title, options, onFilterChange, loading, defaultValue, isMulti}) => {

    const handleChange = (values) => {
      onFilterChange(values);
    };

    const selectStyles = {
        container: (styles) => {
            return ({
                ...styles,
                "width": "100%"
            })
        },
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled && 'grey',
                cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
    };

    return (
      <Filter>
        <FiltersTitle id={`${title.toLowerCase()}-label`}>{title}</FiltersTitle>
        <Select
            instanceId={title.toLowerCase()}
            aria-label={title}
            name={title.toLowerCase()}
            styles={selectStyles}
            closeMenuOnSelect={false}
            defaultValue={defaultValue}
            options={options}
            isMulti={isMulti}
            onChange={handleChange}
        />
      </Filter>
    );
};

export default SelectFilter;

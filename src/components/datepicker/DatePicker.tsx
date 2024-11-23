import React, { FC } from 'react';

import { Select } from '@uselagoon/ui-library';
import { DatePicker, TimeRangePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { StyledPickerWrapper, StyledRangePicker } from '../pages/deployments/_components/styles';

interface Props {
  range: any;
  handleRangeChange: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => void;
}
const CustomRangePicker: FC<Props> = ({ range, handleRangeChange }) => {
  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Today', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
    { label: 'Past Week', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Past Month', value: [dayjs().add(-1, 'month'), dayjs()] },
  ];

  const onRangeChange = (dates: null | (Dayjs | null)[]) => {
    if (dates && dates.length === 2) {
      handleRangeChange(dates as [Dayjs | null, Dayjs | null]);
    }
  };

  return (
    <Select
      defaultOpen={false}
      allowClear
      onClear={() => {
        handleRangeChange(null);
      }}
      value={range?.every(Boolean) ? `${range[0]} - ${range[1]}` : 'Select date range'}
      dropdownStyle={{ width: 300 }}
      dropdownRender={() => (
        <StyledPickerWrapper
          onMouseDown={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <StyledRangePicker presets={rangePresets} onChange={onRangeChange} />
        </StyledPickerWrapper>
      )}
    />
  );
};

export default CustomRangePicker;

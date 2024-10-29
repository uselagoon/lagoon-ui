import { DatePicker } from 'antd';
import styled from 'styled-components';

const { RangePicker } = DatePicker;

export const StyledNewDeployment = styled.section`
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-block-end: 1.5rem;
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: #ffffff;
  width: max-content;
  padding-inline: 2rem;
  padding-block: 0.375rem;
  .description {
    font-family: 'ArabicPro-Regular', sans-serif;
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
`;
export const StyledRangePicker = styled(RangePicker)`
  .ant-picker-input {
    border-radius: 2px;
    padding: 4px 12px;
  }

  .ant-picker {
    border-radius: 2px;
    padding: 4px 12px;
    font-size: 14px;
  }

  .ant-picker-focused,
  .ant-picker:hover {
    border-color: #d9d9d9;
    box-shadow: none;
  }
`;

export const StyledPickerWrapper = styled.section``;
export const DeploymentsFilters = styled.div`
  margin-bottom: 2.75rem;
  display: flex;
  gap: 0.875rem;
`;

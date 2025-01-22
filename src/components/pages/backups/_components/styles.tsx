import { Radio } from 'antd';
import styled from 'styled-components';

const RadioGroupComponent = Radio.Group;

export const StyledBackupTrigger = styled.section`
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
    /* font-family: 'ArabicPro-Regular', sans-serif; */
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
`;

export const RadioGroup = styled(RadioGroupComponent)`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
`;

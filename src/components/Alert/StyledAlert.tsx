import { color } from 'lib/variables';
import styled, { css } from 'styled-components';

const sharedStyles = css`
  position: relative;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
`;

export const StyledAlert = styled.div`
  border-radius: 0.25rem;
  &.error {
    color: ${color.white};
    background-color: #d68100;

    .anticon-close-circle {
      margin-right: 4px;
      vertical-align: text-top;
    }
  }

  .closebtn {
    margin: 4px 8px 0 0;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
    cursor: pointer;

    &.closebtn:hover {
      color: black;
    }
  }
`;

export const StyledAlertContent = styled.div`
  ${sharedStyles}
`;

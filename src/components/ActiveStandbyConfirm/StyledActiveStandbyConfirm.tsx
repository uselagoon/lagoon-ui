import { color } from 'lib/variables';
import styled from 'styled-components';

export const StyledActiveStandbyConfirm = styled.div`
  .margins {
    margin-right: 10px;
    margin-left: 4rem;
  }
`;

export const StyledActiveStandbyConfirmModal = styled.div`
  .margins {
    margin-right: 10px;
  }
  input {
    margin-right: 10px;
    width: 100%;
  }
  .environment-name {
    font-weight: bold;
    color: ${color.lightBlue};
  }
  .hover-state {
    margin-right: 10px;
    color: ${color.blue};
  }
  .form-input {
    display: flex;
    align-items: center;
  }
`;

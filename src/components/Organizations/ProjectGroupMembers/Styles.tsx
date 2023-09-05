import { bp, color } from 'lib/variables';
import styled from 'styled-components';

import { sharedTableStyles } from '../SharedStyles';

export const StyledGroupMembers = styled.div`
  .default-group-label {
    color: ${color.white};
    display: inline-block;
    background: #262d65;
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }

  .name,
  .members,
  .labels {
    font-family: 'roboto', sans-serif;
    font-size: 0.8125rem;
    height: 100%;
    display: flex;
    align-items: center;
    width: 35%;
    border-right: 1px solid ${props => props.theme.borders.tableRow};
  }
  .remove {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
    .btn-red {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 54px;
      height: 36px;
      svg {
        font-size: 1.35rem;
      }
    }
  }
  ${sharedTableStyles}
  .data-table {
    .data-row {
      & > div {
        padding-left: 20px;
        @media ${bp.tinyUp} {
          width: 50%;
        }
      }
    }
    .data-row {
      height: 63px;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      transition: 0.3s ease;
      border: 1px solid transparent;
      justify-content: flex-start !important;
      &:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.borders.tableRow};
      }
      &:hover {
        border: 1px solid #2bc0d8;
      }
    }
  }
`;

import { bp, color } from 'lib/variables';
import styled from 'styled-components';

import { sharedTableStyles } from '../SharedStyles';

export const StyledProjectNotifications = styled.div`
  .default-group-label {
    color: ${color.white};
    display: inline-block;
    background-color: ${props => (props.theme.colorScheme === 'dark' ? props.theme.borders.tableRow : color.black)};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .name {
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
    width: 100%;
    padding: 0;
  }
  ${sharedTableStyles}
  .data-table {
    .data-row {
      @media ${bp.tinyUp} {
        display: flex;
        justify-content: space-between;
        padding-right: 40px;
      }
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
  .slack-group-label {
    color: ${color.white};
    background-color: ${color.blue};
    margin-left: 5px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .rocketchat-group-label {
    color: ${color.white};
    background-color: ${color.teal};
    margin-left: 5px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .email-group-label {
    color: ${color.black};
    background-color: ${color.lightGreen};
    margin-left: 5px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .microsoftteams-group-label {
    color: ${color.black};
    background-color: ${color.lightestBlue};
    margin-left: 5px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .webhook-group-label {
    color: ${color.white};
    background-color: ${color.lightRed};
    margin-left: 5px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
`;

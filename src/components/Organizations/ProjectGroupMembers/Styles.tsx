import { bp, color } from 'lib/variables';
import styled from 'styled-components';

import { sharedTableStyles } from '../SharedStyles';

export const StyledGroupMembers = styled.div`
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
    padding: 8px 0 7px 0;
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
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
  }
`;

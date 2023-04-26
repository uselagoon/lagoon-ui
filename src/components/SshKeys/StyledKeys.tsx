import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledKeys = styled.div`
  label.fingerprint,
  div.fingerprint {
    flex: 4;
    align-self: center;
  }
  label.type,
  div.type {
    flex: 2;
    align-self: center;
  }
  label.name,
  div.name {
    flex: 1.8;
  }

  label.created,
  div.created {
    flex: 2;
  }

  .header {
    padding-right: calc(15% + 8px);
    display: flex;

    @media ${bp.wideUp} {
      align-items: center;
      display: flex;
      margin: 0 0 14px;
    }
    @media ${bp.smallOnly} {
      flex-wrap: wrap;
    }
    @media ${bp.tabletUp} {
      margin-top: 40px;
    }

    label {
      display: none;
      padding-left: 20px;
      @media ${bp.wideUp} {
        display: block;
      }
    }
  }

  .data-table {
    background-color: ${props => props.theme.backgrounds.table};
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);

    .data-none {
      border: 1px solid ${props => props.theme.borders.tableRow};
      border-bottom: 1px solid ${props => props.theme.borders.tableRow};

      border-radius: 3px;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      text-align: center;
    }

    .data-row {
      border: 1px solid ${props => props.theme.borders.tableRow};
      border-bottom: 1px solid ${props => props.theme.borders.tableRow};
      border-radius: 0;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;

      > div {
        word-wrap: break-word;
        word-break: break-all;
      }
      @media ${bp.wideUp} {
        display: flex;
        justify-content: space-between;
        padding-right: 15px;
      }

      & > div {
        padding-left: 20px;
        @media ${bp.wideDown} {
          padding-right: 40px;
        }

        @media ${bp.wideUp} {
          &.name,
          &.type,
          &.fingerprint,
          &.created {
            align-self: center;
          }
          &.name {
            overflow-wrap: break-word;
          }

          &.fingerprint {
            overflow-wrap: break-word;
          }
          &.delete {
            width: 15% !important;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        &.created {
          word-break: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          @media ${bp.wideUp} {
            width: 45%;
          }
          @media ${bp.extraWideUp} {
            width: 50%;
          }
        }
      }

      &:hover {
        border: 1px solid ${color.brightBlue};
      }

      &:first-child {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }

      &:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }
  }
`;

import { bp, color, fontSize } from 'lib/variables';
import styled from 'styled-components';

export const StyledDeployments = styled.div`
  .header {
    width: 90%;
    @media ${bp.tinyUp} {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin: 0 0 14px;
    }
    @media ${bp.smallOnly} {
      flex-wrap: wrap;
    }
    @media ${bp.tabletUp} {
      margin-top: 40px;
    }

    label {
      width:25%;
      display: none;
      display:inline-block;
      padding-left:20px;
      @media ${bp.tinyUp} {
        display: block;
      }
    }
  }

  .bulk-label {
    background-color: ${color.lightBlue};
    ${fontSize(12)};
    margin-left: 10px;
    padding: 0px 5px 0px 5px;
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
    &:hover {
      background-color: ${color.blue};
    }
  }

  .data-table {
    background-color: ${props => props.theme.backgrounds.table};
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);

    .deploymentRow {
      display: flex;
      align-items: center;
      border: 1px solid ${props => props.theme.borders.tableRow};
      transition: all 0.2s ease;
      transition: all 0.3s ease;
      &:hover {
        border: 1px solid #2bc0d8;
      }
      & > :nth-child(1) {
        width: 90% !important;
      }
      & > :nth-child(2) {
        padding: unset;
        height: 30px;
        &.btn--disabled {
          margin-right: unset;
        }
      }
      .cancel-button {
        width: 10%;
        button {
          width:90%;
          padding:0 !important;
          margin-right: unset !important;
          height:30px;
        }
        max-height: 100px;
      }
    }
    .data-none {
      border: 1px solid ${props => props.theme.borders.tableRow};
      border-bottom: 1px solid ${props => props.theme.borders.tableRow};
      border-radius: 3px;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      text-align: center;
      transition: all 0.3s ease;
    }

    .data-row {
      border: 0px transparent;
      border-bottom: 0px solid transparent;
      border-radius: 0;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      @media ${bp.tinyUp} {
        display: flex;
        justify-content: space-between;
      }

      & > div {
        padding-left: 20px;
        width: 25%;
      }

      &:hover {
        border-width: 0px !important;
      }
      &:first-child {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }

      &:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }

      .status {
        @media ${bp.xs_smallOnly} {
          margin-left: 20px;
        }
        background-position: left 7px;
        background-repeat: no-repeat;
        background-size: 10px 10px;

        &.new {
          background-image: url('/static/images/pending.svg');
        }

        &.pending {
          background-image: url('/static/images/pending.svg');
        }

        &.running {
          background-image: url('/static/images/in-progress.svg');
        }

        &.cancelled {
          background-image: url('/static/images/failed.svg');
        }

        &.error {
          background-image: url('/static/images/failed.svg');
        }

        &.failed {
          background-image: url('/static/images/failed.svg');
        }

        &.complete {
          background-image: url('/static/images/successful.svg');
        }
      }
    }
  }
`;

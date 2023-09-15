import { bp, color, fontSize } from 'lib/variables';
import styled from 'styled-components';

export const StyledTasks = styled.div`
  .header {
    width: calc(90% - 20px);
    @media ${bp.tinyUp} {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin: 0 0 14px;
      padding-right: 40px;
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
      @media ${bp.tinyUp} {
        display: block;
        width: 20%;
      }
      @media ${bp.xs_smallUp} {
        width: 24%;
        &.service,
        &.status {
          width: 14%;
        }
      }
    }
  }
`;

export const TasksTable = styled.div`
  &.data-table {
    background-color: ${props => props.theme.backgrounds.table};
    border: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 3px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
    .taskRow {
      display: flex;
      align-items: center;
      border: 1px solid ${props => props.theme.borders.tableRow};
      transition: all 0.2s ease;
      padding-right: 20px;
      &:hover {
        border: 1px solid #2bc0d8;
      }
      & > :nth-child(1) {
        flex-basis: 90%;
      }
      & > :nth-child(2) {
        flex-basis: 10%;
        max-width: 120px;
        padding: unset;
        height: 30px;
        &.btn--disabled {
          margin-right: unset;
        }
      }
    }
    .data-none {
      border: 1px solid ${props => props.theme.borders.tableRow};
      border-bottom: 1px solid ${props => props.theme.borders.tableRow};
      border-radius: 3px;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      text-align: center;
    }

    .data-row {
      background-image: url('/static/images/right-arrow.svg');
      background-position: right 20px center;
      background-repeat: no-repeat;
      background-size: 18px 11px;
      border-radius: 0;
      line-height: 1.5rem;
      padding: 8px 0 7px 0;
      &:hover {
        // override shared style
        border-width: 0px !important;
      }
      @media ${bp.tinyUp} {
        display: flex;
        justify-content: space-between;
        padding-right: 40px;
      }

      & > div {
        padding-left: 20px;
        @media ${bp.tinyUp} {
          width: 20%;
        }
        @media ${bp.xs_smallUp} {
          width: 24%;
          &.service,
          &.status {
            width: 14%;
          }
        }
      }

      .bulk-label {
        color: ${color.white};
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

      .status {
        @media ${bp.tinyOnly} {
          margin-left: 20px;
        }
        @media ${bp.tiny_wide} {
          background-position: center;
        }
        background-position: left 7px;
        background-repeat: no-repeat;
        background-size: 10px 10px;

        &.active {
          background-image: url('/static/images/in-progress.svg');
        }

        &.new {
          background-image: url('/static/images/in-progress.svg');
        }

        &.pending {
          background-image: url('/static/images/in-progress.svg');
        }

        &.running {
          background-image: url('/static/images/in-progress.svg');
        }

        &.failed {
          background-image: url('/static/images/failed.svg');
        }

        &.cancelled {
          background-image: url('/static/images/failed.svg');
        }

        &.succeeded {
          background-image: url('/static/images/successful.svg');
        }

        &.complete {
          background-image: url('/static/images/successful.svg');
        }

        span {
          @media ${bp.tiny_wide} {
            display: none;
          }
        }
      }
    }
  }
`;

import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const BulkDeploymentsHeader = styled.div`
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
    width: 25%;
    @media ${bp.tinyUp} {
      display: block;
    }
  }

  .priority {
    width: 10%;
  }
`;

export const BulkDeploymentsDataTable = styled.div`
  background-color: ${props => props.theme.backgrounds.table};
  border: 1px solid ${props => props.theme.borders.tableRow};
  border-radius: 3px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);

  .data-none {
    background-color: ${props => props.theme.backgrounds.table};
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

    border: 1px solid ${props => props.theme.borders.tableRow};
    border-bottom: 1px solid ${props => props.theme.borders.tableRow};
    border-radius: 0;
    line-height: 1.5rem;
    padding: 8px 0 7px 0;
    @media ${bp.tinyUp} {
      display: flex;
      justify-content: space-between;
      padding-right: 40px;
    }

    & > div {
      padding-left: 20px;
      @media ${bp.tinyUp} {
        width: 25%;
      }
    }

    &:hover {
      border: 1px solid ${color.brightBlue};
    }

    &:first-child {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }

    &:nth-child(odd) {
      background-color: ${props => props.theme.backgrounds.table};
    }

    &:nth-child(even) {
      background-color: ${props => props.theme.backgrounds.tableLight};
    }

    &:last-child {
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }

    .priority {
      width: 10%;
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
`;

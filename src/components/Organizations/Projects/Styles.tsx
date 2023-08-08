import { bp, color } from 'lib/variables';
import styled from 'styled-components';

import { sharedTableStyles } from '../SharedStyles';

export const StyledOrgProjects = styled.div`
  width: 95.83%;
  padding-top: 22px;
  padding-inline: 12px;
  display: flex;
  flex-direction: column;
  .edit{
    svg {
        color: #4578e6;
      }
  }
  .remove {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    width: 10%;
  }
  .project {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    width: 40%;
    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }
  .customer {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;

    color: ${props => (props.theme.colorScheme === 'dark' ? color.midGrey : color.darkGrey)};
    width: 30%;
    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }
  .default-group-label {
    color: ${color.white};
    background-color: ${props => (props.theme.colorScheme === 'dark' ? props.theme.borders.tableRow : color.black)};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .newGroup {
    background: ${color.midGrey};
    padding: 15px;
    @media ${bp.smallOnly} {
      margin-bottom: 20px;
      order: -1;
      width: 100%;
    }
  }
  .form-box input,
  textarea {
    display: inline-block;
    width: 50%;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    min-height: 38px;
    border-color: hsl(0, 0%, 80%);
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    color: #5f6f7a;
    padding: 8px;
    box-sizing: border-box;
  }
  input[type='text']:focus {
    border: 2px solid ${color.linkBlue};
    outline: none;
  }
  label {
    padding-left: 20px;
    padding-right: 15px;
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
      }
    }
  }
  .header {
    @media ${bp.tinyUp} {
      align-items: center;
      display: flex;
      justify-content: flex-end;
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
      width: 100%;
      @media ${bp.tinyUp} {
        display: block;
      }
      &:nth-child(2) {
        @media ${bp.tabletUp} {
          width: 20%;
        }
      }
    }
  }
  .project {
    font-weight: normal;

    @media ${bp.tinyUp} {
      width: 50%;
    }
  }
  .description {
    line-height: 24px;
  }
`;

export const ProjectDetails = styled.div`
  > .field-wrapper {
    &::before {
      padding-right: unset;
      width: unset;
    }
  }
`;

export const OrgProjectWrapper = styled.div`
  flex-grow: 1;
  padding: 40px calc((100vw / 16) * 1);
  .details {
    width: 100%;
    @media ${bp.xs_smallUp} {
      display: flex;
      flex-wrap: wrap;
      min-width: 100%;
      width: 100%;
    }

    .field-wrapper {
      &::before {
        left: calc(((-100vw / 16) * 1.5) - 28px);
      }
      margin: 0px;
      @media ${bp.xs_smallUp} {
        min-width: 50%;
        position: relative;
        width: 50%;
      }
      @media ${bp.wideUp} {
        min-width: 33.33%;
        width: 33.33%;
      }
      @media ${bp.extraWideUp} {
        min-width: 25%;
        width: 25%;
      }

      &.environmentType {
        &::before {
          background-size: 20px 20px;
        }
      }
    }
  }

  .rightside-button {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 0;
  }
`;

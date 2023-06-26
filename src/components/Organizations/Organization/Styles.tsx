import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledOrganization = styled.div`
  padding: 16px calc((100vw / 32) * 1);
  width: 100%;
  @media ${bp.xs_smallUp} {
    display: flex;
    flex-wrap: wrap;
    min-width: 100%;
    padding-top: 48px;
    width: 100%;
  }
  @media ${bp.tabletUp} {
    padding: 48px calc((100vw / 32) * 1) 48px calc(((100vw / 16) * 1.5) + 28px);
  }
  @media ${bp.extraWideUp} {
    padding-left: calc(((100vw / 32) * 1) + 28px);
  }
  .owner-label {
    color: ${color.white};
    background-color: ${color.blue};
    margin-left: 10px;
    padding: 0px 5px 0px 5px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .viewer-label {
    color: ${color.black};
    background-color: ${color.lightestBlue};
    margin-left: 10px;
    padding: 0px 5px 0px 5px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .field-wrapper {

    &::before {
      margin-right:28px;
      padding-left:14px;
      left: calc(((-100vw / 16) * 1.5) - 28px);
    }
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
    &.quotaProject {
      width: 100%;
      > * {
        padding-left:14px;
      }

      &::before {
        margin-inline:14px;
        background-image: url('/static/images/tasks-dark.svg');
        background-size: 15px 20px;
      }
    }
    &.targets {
      width: 50%;
      &::before {
        background-image: url('/static/images/target.svg');
        background-size: 19px 19px;
      }
    }
    &.owners {
      width: 50%;
      &::before {
        background-image: url('/static/images/members.svg');
        background-size: 19px 19px;
      }
    }
    & > div {
      width: 100%;
    }
    .field {
      padding-right: calc((100vw / 16) * 1);
    }
  }
`;

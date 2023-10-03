import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledEnvironmentDetails = styled.div`
  padding: 32px calc((100vw / 16) * 1);
  width: 100%;
  padding-left: 5%;
  .btn-red {
    margin-left: 64px;
  }
  > * {
    display: flex;
    align-items: flex-start;

    height: min-content;
    .field {
      padding-right: 0 !important;
      text-align: left;
    }
  }
  @media ${bp.xs_smallUp} {
    display: flex;
    flex-wrap: wrap;
    min-width: 100%;

    padding-top: 48px;
    width: 100%;
  }
  .field-wrapper {
    > div {
      padding-right: 36px;
    }
    &::before {
      margin-right: 14px;
      background-position-y: 15px;
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
    &.environmentType {
      &::before {
        background-image: url('/static/images/environments.svg');
        background-size: 20px 20px;
      }
    }
    &.deployType {
      &::before {
        background-image: url('/static/images/branches.svg');
        background-size: 15px 20px;
      }
    }
    &.updated {
      &::before {
        background-image: url('/static/images/last-deploy.svg');
        background-size: 20px 15px;
      }
    }
    &.routes {
      width: 100%;
      &::before {
        background-image: url('/static/images/url.svg');
        background-size: 19px 19px;
      }
    }
    &.created {
      &::before {
        background-image: url('/static/images/created.svg');
        background-size: 17px 16px;
      }
    }
    &.source,
    &.giturl {
      width: 100%;
      &::before {
        background-size: 19px 17px;
      }

      &.source {
        &::before {
          background-image: url('/static/images/git-lab.svg');
        }
      }
      &.giturl {
        &::before {
          background-image: url('/static/images/git.svg');
        }
      }
      .field {
        color: ${color.linkBlue};
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
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

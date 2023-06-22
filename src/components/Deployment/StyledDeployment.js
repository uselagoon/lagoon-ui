import { bp } from 'lib/variables';
import styled from 'styled-components';

export const FieldWrapper = styled.div`
  display: flex;
  > div {
    padding-left: 14px;
  }
  &::before {
    left: calc(((-100vw / 16) * 1.5) - 28px);

    content: '';
    display: inline-block;
    background-repeat: no-repeat;
    height: 60px;
    width: 25px;
    border-right: 1px solid rgb(235, 236, 240);
    padding-right: 14px;
  }
  @media ${bp.xs_smallUp} {
    min-width: 50%;
    position: relative;
    width: 50%;
  }
  @media ${bp.desktopUp} {
    min-width: 33.33%;
    min-width: calc(100% / 3);
    width: 33.33%;
    width: calc(100% / 3);
  }
  @media ${bp.extraWideUp} {
    min-width: 25%;
    width: 25%;
  }

  &.created {
    &::before {
      background-image: url('/static/images/created.svg');
      background-size: 17px 16px;
    }
  }

  &.duration {
    &::before {
      background-image: url('/static/images/duration.svg');
      background-size: 17px;
    }
  }

  &.status {
    &::before {
      background-size: 14px;
    }

    &.new {
      &::before {
        background-image: url('/static/images/pending.svg');
      }
    }

    &.pending {
      &::before {
        background-image: url('/static/images/pending.svg');
      }
    }

    &.running {
      &::before {
        background-image: url('/static/images/in-progress.svg');
      }
    }

    &.cancelled {
      &::before {
        background-image: url('/static/images/failed.svg');
      }
    }

    &.error {
      &::before {
        background-image: url('/static/images/failed.svg');
      }
    }

    &.failed {
      &::before {
        background-image: url('/static/images/failed.svg');
      }
    }

    &.complete {
      &::before {
        background-image: url('/static/images/successful.svg');
      }
    }
  }

  &.bulk {
    &::before {
      background-image: url('/static/images/tasks-dark.svg');
      background-size: 14px;
    }
  }

  & > div {
    width: 100%;
  }

  .field {
    padding-right: calc((100vw / 16) * 1);
    @media ${bp.extraWideUp} {
      padding-right: calc((100vw / 16) * 0.5);
    }
  }
`;

export const DeploymentDetails = styled.div`
  padding-inline: 5% 10%;
  width: 100%;
  @media ${bp.xs_smallUp} {
    display: flex;
    flex-wrap: wrap;
    min-width: 100%;

    position: relative;
    width: 100%;
  }

  @media ${bp.extraWideUp} {
    padding-top: 48px;
  }

  h3 {
    width: 100%;
    @media ${bp.xs_smallUp} {
      left: calc(100vw / 16);
      position: absolute;
      top: 32px;
    }
    @media ${bp.tabletUp} {
      top: 48px;
    }
    @media ${bp.extraWideUp} {
      min-width: 25%;
      padding-right: 60px;
      position: initial;
      width: 25%;
    }
  }
`;

export const ButtonRow = styled.div`
  padding: 0px calc(100vw / 16) 20px;
  width: 100%;
  @media ${bp.xs_smallUp} {
    display: flex;
    flex-wrap: wrap;
    min-width: 100%;
    padding-left: calc(((100vw / 16) * 1.5) + 28px);
    position: relative;
    width: 100%;
  }
  @media ${bp.tabletUp} {
    padding: 0 calc(100vw / 16) 20px calc(((100vw / 16) * 1.5) + 28px);
  }
  @media ${bp.extraWideUp} {
    padding-left: calc(100vw / 16);
  }
`;

export const SkeletonWrapper = styled.div`
  padding: 0 calc(100vw / 16) 48px;
`;

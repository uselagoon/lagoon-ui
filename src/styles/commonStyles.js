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
  &.service {
    &::before {
      background-image: url('/static/images/service.svg');
      background-size: 16px;
    }
  }

  &.status {
    &::before {
      background-size: 14px;
    }
    &.active {
      &::before {
        background-image: url('/static/images/in-progress.svg');
      }
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

    &.failed {
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

    &.succeeded {
      &::before {
        background-image: url('/static/images/successful.svg');
      }
    }

    &.complete {
      &::before {
        background-image: url('/static/images/successful.svg');
      }
    }
  }

  &.command {
    &::before {
      background-image: url('/static/images/command.svg');
      background-size: 16px;
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

  &.files {
    &::before {
      background-image: url('/static/images/files.svg');
      background-size: 17px;
    }

    ul.field {
      margin: 0;

      li {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }
  }
`;

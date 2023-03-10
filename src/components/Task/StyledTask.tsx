import styled from "styled-components";
import { bp } from "lib/variables";

export const StyledTask = styled.div`
  .details {
    width: 100%;
    padding-top: 48px;
    margin-inline: 7% 10%;
    @media ${bp.xs_smallUp} {
      display: flex;
      flex-wrap: wrap;
      min-width: 100%;
      position: relative;
      width: 100%;
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
        margin-left: calc(((-100vw / 16) / 1.25) + 28px);
        position: initial;
      }
    }

    .field-wrapper {
      & > div:first-of-type {
        margin-left: 14px;
      }
      &::before {
        left: calc(((-100vw / 16) * 1.5) - 28px);
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
          background-image: url("/static/images/created.svg");
          background-size: 17px 16px;
        }
      }

      &.command {
        &::before {
          background-image: url("/static/images/command.svg");
          background-size: 16px;
        }
      }

      &.service {
        &::before {
          background-image: url("/static/images/service.svg");
          background-size: 16px;
        }
      }

      &.status {
        &::before {
          background-size: 14px;
        }

        &.active {
          &::before {
            background-image: url("/static/images/in-progress.svg");
          }
        }

        &.new {
          &::before {
            background-image: url("/static/images/in-progress.svg");
          }
        }

        &.pending {
          &::before {
            background-image: url("/static/images/in-progress.svg");
          }
        }

        &.running {
          &::before {
            background-image: url("/static/images/in-progress.svg");
          }
        }

        &.failed {
          &::before {
            background-image: url("/static/images/failed.svg");
          }
        }

        &.cancelled {
          &::before {
            background-image: url("/static/images/failed.svg");
          }
        }

        &.succeeded {
          &::before {
            background-image: url("/static/images/successful.svg");
          }
        }

        &.complete {
          &::before {
            background-image: url("/static/images/successful.svg");
          }
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
          background-image: url("/static/images/files.svg");
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
    }
  }
`;

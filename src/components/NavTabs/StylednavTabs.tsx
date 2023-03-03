import styled from "styled-components";

import { bp, color } from "lib/variables";

export const StyledNavigation = styled.ul`
  background: ${color.lightestGrey};
  border-right: 1px solid ${color.midGrey};
  margin: 0;
  z-index: 10;
  @media ${bp.tabletUp} {
    min-width: 30%;
    padding-bottom: 60px;
  }
  @media ${bp.wideUp} {
    min-width: 25%;
  }

  li {
    border-bottom: 1px solid ${color.midGrey};
    margin: 0;
    padding: 0;
    position: relative;

    &:hover {
      background-color: ${color.white};
    }

    &::before {
      background-color: ${color.linkBlue};
      background-position: center center;
      background-repeat: no-repeat;
      content: "";
      display: block;
      height: 59px;
      left: 0;
      position: absolute;
      top: 0;
      transition: all 0.3s ease-in-out;
      width: 45px;
    }

    a {
      color: ${color.darkGrey};
      display: block;
      padding: 20px 20px 19px 60px;
      @media ${bp.wideUp} {
        padding-left: calc((100vw / 16) * 1);
      }
    }

    &.active {
      &::before {
        background-color: ${color.almostWhite};
      }

      background-color: ${color.almostWhite};
      border-right: 1px solid ${color.almostWhite};
      width: calc(100% + 1px);

      a {
        color: ${color.black};
      }
    }

    &.overview {
      &::before {
        background-image: url("/static/images/overview.svg");
        background-size: 18px;
      }

      &.active::before {
        background-image: url("/static/images/overview-active.svg");
      }
    }

    &.deployments {
      &::before {
        background-image: url("/static/images/deployments.svg");
        background-size: 21px 16px;
      }

      &.active::before {
        background-image: url("/static/images/deployments-active.svg");
      }
    }

    &.backups {
      &::before {
        background-image: url("/static/images/backups.svg");
        background-size: 19px;
      }

      &.active::before {
        background-image: url("/static/images/backups-active.svg");
      }
    }

    &.tasks {
      &::before {
        background-image: url("/static/images/tasks.svg");
        background-size: 16px;
      }

      &.active::before {
        background-image: url("/static/images/tasks-active.svg");
      }
    }

    &.problems {
      &::before {
        background-image: url("/static/images/problems.svg");
        background-size: 16px;
      }

      &.active::before {
        background-image: url("/static/images/problems-active.svg");
      }
    }

    &.facts {
      &::before {
        background-image: url("/static/images/facts.svg");
        background-size: 16px;
      }

      &.active::before {
        background-image: url("/static/images/facts-active.svg");
      }
    }

    &.insights {
      &::before {
        background-image: url("/static/images/insights.svg");
        background-size: 16px;
      }

      &.active::before {
        background-image: url("/static/images/insights-active.svg");
      }
    }
  }

  .deployLink {
    a {
      color: ${color.darkGrey};
      display: block;
      padding: 20px 20px 19px 60px;
      @media ${bp.wideUp} {
        padding-left: calc((100vw / 16) * 1);
      }
    }

    .active a {
      color: ${color.black};
    }
  }
`;

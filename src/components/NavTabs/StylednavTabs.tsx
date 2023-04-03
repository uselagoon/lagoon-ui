import styled from "styled-components";

import { bp, color } from "lib/variables";

export const StyledNavigation = styled.ul`
  background: ${props => props.theme.backgrounds.sidebar};
  border-right: 1px solid ${props => props.theme.borders.input};
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
    border-bottom: 1px solid ${props => props.theme.borders.input};
    margin: 0;
    padding: 0;
    position: relative;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${color.white} !important;
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
      color: ${props => props.theme.texts.navigation};
      display: block;
      padding: 20px 20px 19px 60px;
      @media ${bp.wideUp} {
        padding-left: calc((100vw / 16) * 1);
      }
    }

    &.active {
      &::before {
        /* background-color: ${color.white}; */
      }
      background-color: ${props => props.theme.backgrounds.content};
      border-right: 1px solid ${(props)=>props.theme.backgrounds.content};
      width: calc(100% + 1px);

      a {
        color: ${props => props.theme.texts.navigation};
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
      color: ${props => props.theme.texts.navigation};
      display: block;
      padding: 20px 20px 19px 60px;
      transition: color 0.2s ease;
      @media ${bp.wideUp} {
        padding-left: calc((100vw / 16) * 1);
      }
      &:hover{
        color: ${color.darkGrey};
      }
    }

    .active a {
      color: ${color.black};
    }
  }
`;

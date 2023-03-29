import styled from "styled-components";
import { bp, color } from 'lib/variables';

export const StyledLeftNavTabs = styled.ul`
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
      content: '';
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
        background-image: url('/static/images/overview.svg');
        background-size: 18px;
      }
      &.active::before {
        background-image: url('/static/images/overview-active.svg');
      }
    }
    &.environments {
      &::before {
        background-image: url("/static/images/environments-sidebar.svg");
        background-size: 21px;
      }
      &.active::before {
        background-image: url('/static/images/environments-active.svg');
      }
    }
    &.variables {
      &::before {
        background-image: url('/static/images/variables.svg');
        background-size: 22px;
      }
      &.active::before {
        background-image: url('/static/images/variables-active.svg');
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
import styled from "styled-components";
import { bp, color } from "lib/variables";

export const StyledProjectNavTabs = styled.ul`
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
      color: ${props => props.theme.texts.navigation};
      display: block;
      padding: 20px 20px 19px 60px;
      @media ${bp.wideUp} {
        padding-left: calc((100vw / 16) * 1);
      }
    }
    &.active {
      &::before {
        // background-color: ${color.almostWhite};
      }
      &:hover {
        background-color: white;
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
    &.variables {
      &::before {
        background-image: url("/static/images/variables.svg");
        background-size: 22px;
      }
      &.active::before {
        background-image: url("/static/images/variables-active.svg");
      }
    }
    &.deployTargets {
      &::before {
        background-image: url("/static/images/target-sidebar.svg");
        background-size: 22px;
      }
      &.active::before {
        background-image: url("/static/images/target-sidebar-active.svg");
      }
    }
  }

  .deployLink {
    a {
      color: ${props => props.theme.texts.navigation};
      display: block;
      padding: 20px 20px 19px 60px;
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

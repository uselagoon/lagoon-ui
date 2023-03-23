import styled from "styled-components";
import { bp, color } from "lib/variables";

export const DropdownButton = styled.a`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${color.white};
  cursor: pointer;
  padding: 0 0 0 10px !important;
  @media ${bp.tinyUp} {
    align-self: auto;
  }
  height: 100%;
  &::after {
    background-position: center center;
    background-repeat: no-repeat;
    content: "";
    display: inline-block;
    transition: all 0.3s ease-in-out;
    height: 10px;
    width: 25px;
    background-image: url("/static/images/profile-dropdown.svg");
    background-size: 9px;
  }
`;

export const StyledDropdown = styled.div`
  border-left: 1px solid ${color.blue};
  cursor: pointer;
  padding: 10px 20px;
  hr {
    border: 1px solid ${color.blue};
  }
  a {
    color: ${color.almostWhite};
    &.settings {
      align-items: center;
      cursor: pointer;
      display: flex;
      &::before {
        background-position: center center;
        background-repeat: no-repeat;
        content: "";
        display: block;
        height: 35px;
        transition: all 0.3s ease-in-out;
        width: 35px;
        color: ${color.white};
        background-image: url("/static/images/cog.svg");
        background-size: 18px;
      }
    }
    &.menuitem {
      align-items: center;
      cursor: pointer;
      display: flex;
      padding: 5px 10px;
    }
    &.logout {
      align-items: center;
      cursor: pointer;
      display: flex;
      &::before {
        background-position: center center;
        background-repeat: no-repeat;
        content: "";
        display: block;
        height: 35px;
        transition: all 0.3s ease-in-out;
        width: 35px;
        background-image: url("/static/images/logout.svg");
        background-size: 18px;
      }
    }
  }
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  z-index: 9;
  list-style-type: none;
  padding: 0;
  right: 20px;
  width: 200px;
  background-color: ${color.lightBlue};
  border: 2px solid ${color.blue};
  border-radius: 8px;

  & > .menu-item {
    padding: 0px !important;
    &:hover {
      background-color: ${color.blue};
    }
    & > a.settings, & > a.logout {
        padding: 0;
    }
  }

  & > li {
    margin: 0px;
  }

  & > ul {
    padding: 0px;
  }
`;

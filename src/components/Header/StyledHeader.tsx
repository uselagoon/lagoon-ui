import { color } from 'lib/variables';
import styled from 'styled-components';

export const StyledHeader = styled.header<{ isOrganizationsPath: boolean }>`
  background: ${color.brightBlue} ${color.lightBlue};
  background: ${color.lightBlue};
  background: ${props =>
    props.isOrganizationsPath
      ? props.theme.gradients.organizationsHeaderGradient
      : props.theme.gradients.headerFooterGradient};

  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${color.brightBlue}', endColorstr='${color.lightBlue}',GradientType=1 );
  display: flex;
  justify-content: space-between;

  .authContainer {
    display: flex;
  }

  a {
    color: ${color.almostWhite};
    padding: 10px 20px;
    &.home {
      background: ${color.blue};
      position: relative;
      img {
        display: block;
        height: 35px;
        width: auto;
      }
      &::after {
        background: ${color.blue};
        clip-path: polygon(0 0, 100% 0, 0 105%, 0 100%);
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        right: -13px;
        top: 0;
        width: 14px;
      }
    }
    &.navitem {
      align-items: center;
      border-left: 1px solid ${props =>
    props.isOrganizationsPath
      ? "transparent"
      : color.blue};
      cursor: pointer;
      display: flex;
      &::before {
        background-position: center center;
        background-repeat: no-repeat;
        content: '';
        display: block;
        height: 35px;
        transition: all 0.3s ease-in-out;
        width: 0px;
        background-size: 18px;
      }
    }
    &.logout {
      align-items: center;
      cursor: pointer;
      display: flex;
    }
  }
`;

export const ControlButtons = styled.div`
  margin-left: auto;
  align-self: center;
`;

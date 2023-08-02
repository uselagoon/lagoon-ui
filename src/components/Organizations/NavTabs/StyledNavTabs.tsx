import { bp, color } from 'lib/variables';
import styled from 'styled-components';

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
      color: ${props => props.theme.texts.navigation};
      display: block;
      padding: 20px 20px 19px 60px;
      @media ${bp.wideUp} {
        padding-left: calc((100vw / 16) * 1);
      }
    }

    &.active {
      background-color: ${props => props.theme.backgrounds.content};
      border-right: 1px solid ${props => props.theme.backgrounds.content};
      width: calc(100% + 1px);

      a {
        color: ${props => props.theme.texts.navigation};
      }
    }
    &.overview {
      &::before {
        background-image: url('/static/images/overview.svg');
        background-size: 21px 16px;
      }

      &.active::before {
        background-image: url('/static/images/overview-active.svg');
      }
    }

    &.groups {
      &::before {
        background-image: url('/static/images/tasks.svg');
        background-size: 21px 16px;
      }

      &.active::before {
        background-image: url('/static/images/tasks-active.svg');
      }
    }

    &.users {
      &::before {
        background-image: url('/static/images/users.svg');
        background-size: 21px 16px;
      }

      &.active::before {
        background-image: url('/static/images/users-active.svg');
      }
    }

    &.projects {
      &::before {
        background-image: url('/static/images/tasks.svg');
        background-size: 21px 16px;
      }

      &.active::before {
        background-image: url('/static/images/tasks-active.svg');
      }
    }

    &.notifications {
      &::before {
        background-image: url('/static/images/tasks.svg');
        background-size: 21px 16px;
      }

      &.active::before {
        background-image: url('/static/images/tasks-active.svg');
      }
    }
  }
  .navLink {
    a {
      color: ${props => props.theme.texts.navigation};
      display: block;
      padding: 20px 20px 19px 60px;
      transition: color 0.2s ease;
      @media ${bp.wideUp} {
        padding-left: calc((100vw / 16) * 1);
      }
      &:hover {
        color: ${color.darkGrey};
      }
    }

    .active a {
      color: ${color.black};
    }
  }
`;

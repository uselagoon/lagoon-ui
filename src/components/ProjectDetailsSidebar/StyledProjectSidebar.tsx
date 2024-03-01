import { bp, color, fontSize } from 'lib/variables';
import styled from 'styled-components';

export const ProjectDetails = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  background-color: ${props => props.theme.backgrounds.content};
  @media ${bp.xs_smallUp} {
    grid-template-columns: 1fr;
  }
  @media ${bp.tabletUp} {
    grid-template-columns: 1f;
  }
  @media ${bp.desktopUp} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${bp.extraWideUp} {
    grid-template-columns: 1fr 1fr 35%;
  }
  @media (min-width: 2400px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const FieldWrapper = styled.div`
  width: 100%;
  @media ${bp.xs_smallUp} {
    width: calc(50% + 24px);
  }

  @media ${bp.tabletUp} {
    width: 100%;
  }
  @media ${bp.desktopUp} {
    width: calc(50% + 24px);
  }
  @media ${bp.extraWideUp} {
    width: calc(85% + 70px);
    &:nth-child(3) {
      width: calc(70% + 30px);
    }
  }
  .deployTargets.hover-state {
    color: ${color.linkBlue};
  }
  > div {
    margin-left: 14px;
  }

  &::before {
    min-width: 25px;
  }

  &.created {
    &:before {
      background-image: url('/static/images/created.svg');
    }
  }
  &.origin {
    > div {
      width: 100%;
    }
    .field {
      color: ${color.linkBlue};
      max-width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 85%;
    }

    &:before {
      background-image: url('/static/images/git-lab.svg');
    }

    & > div {
      max-width: 100%;
    }
  }

  &.giturl {
    margin-bottom: 24px;
    overflow: visible;
    white-space: nowrap;
    @media ${bp.xs_smallUp} {
      margin-bottom: 36px;
    }

    & > div {
      max-width: 100%;
      position: relative;
    }

    &:before {
      background-image: url('/static/images/git.svg');
      height: 84px;
    }

    .copy-field {
      display: flex;
      width: 100%;
      overflow: visible;
      transform: translateX(-13px);
    }
    .field {
      background-color: ${props => props.theme.backgrounds.copy};
      border-right: 28px solid ${color.white};
      color: ${props => props.theme.texts.primary};
      font-family: 'source-code-pro', sans-serif;
      ${fontSize(13)};
      margin-top: 6px;
      overflow: hidden;
      padding: 6px 13px 6px 15px;
      position: relative;
      text-overflow: ellipsis;
    }

    &.skeleton .field {
      padding: 0;
      margin: 0;
      background-color: transparent;
      border: none;
    }
    .copy {
      background: url('/static/images/copy.svg') center center no-repeat ${props => props.theme.backgrounds.copy};
      background-size: 16px;
      bottom: 0;
      height: 34px;
      position: absolute;
      right: 0;
      width: 40px;
      transition: all 0.5s;

      &:hover {
        background-color: ${props => props.theme.backgrounds.sidebar};
        cursor: pointer;
      }
    }

    .copied {
      background-color: ${props => props.theme.backgrounds.copy};
      ${fontSize(9, 16)};
      border-radius: 3px;
      padding: 0 2px;
      position: absolute;
      right: 0;
      text-transform: uppercase;
      top: 20px;
      transition: top 0.5s, opacity 0.75s ease-in;
    }
  }

  &.branches {
    &:before {
      background-image: url('/static/images/branches.svg');
    }

    .field {
      white-space: break-spaces;
    }
  }

  &.prs {
    &:before {
      background-image: url('/static/images/pull-request.svg');
    }
  }

  &.envlimit {
    &:before {
      background-image: url('/static/images/environments-in-use.svg');
      height: 84px;
    }
  }

  &.target {
    &:before {
      background-image: url('/static/images/target.svg');
    }

    .field1 {
      margin-left: 10px;
      max-width: 100%;
      white-space: break-spaces;
    }

    .field2 {
      margin-left: 20px;
      max-width: 100%;
      white-space: break-spaces;
    }
  }

  &.members {
    &:before {
      background-image: url('/static/images/members.svg');
    }

    & > div {
      display: block;
      width: 100%;
    }

    .field {
      .member {
        margin-bottom: 5px;

        .name {
          font-weight: 400;
          display: inline-block;
          float: left;
        }

        .email {
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          float: left;
        }
      }
    }
  }
`;

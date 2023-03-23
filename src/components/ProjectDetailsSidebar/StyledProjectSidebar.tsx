import styled from "styled-components";
import { bp, color, fontSize } from "lib/variables";

export const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 24px 48px clamp(5%, 4vw, 20%);

  @media ${bp.xlWideDown} {
    padding: 48px 24px 48px clamp(5%, 1vw, 10%);
  }
  width: 100%;
`;

export const FieldWrapper = styled.div`
  width: clamp(23rem, 95%, 24.375rem);
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  > div {
    margin-left: 14px;
  }

  &::before {
    min-width: 25px;
  }

  &.created {
    &:before {
      background-image: url("/static/images/created.svg");
    }
  }
  &.origin {
    width: 100%;
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
      background-image: url("/static/images/git-lab.svg");
    }

    & > div {
      max-width: 100%;
    }
  }

  &.giturl {
    margin-bottom: 24px;
    overflow: visible;
    @media ${bp.xs_smallUp} {
      margin-bottom: 36px;
    }

    & > div {
      max-width: 100%;
      position: relative;
    }

    &:before {
      background-image: url("/static/images/git.svg");
      height: 84px;
    }

    .copy-field {
      display: flex;
      width: 100%;
      overflow: visible;
      transform: translateX(-13px);
    }
    .field {
      background-color: ${color.white};
      border-right: 28px solid ${color.white};
      color: ${color.darkGrey};
      font-family: "source-code-pro", sans-serif;
      ${fontSize(13)};
      margin-top: 6px;
      overflow: hidden;
      padding: 6px 13px 6px 15px;
      position: relative;
      text-overflow: ellipsis;
    }

    .copy {
      background: url("/static/images/copy.svg") center center no-repeat
        ${color.white};
      background-size: 16px;
      border-left: 1px solid ${color.lightestGrey};
      bottom: 0;
      height: 33px;
      position: absolute;
      right: 0;
      width: 37px;
      transition: all 0.5s;

      &:hover {
        background-color: ${color.midGrey};
        cursor: pointer;
      }
    }

    .copied {
      background-color: ${color.midGrey};
      ${fontSize(9, 16)};
      border-radius: 3px;
      padding: 0 4px;
      position: absolute;
      right: 0;
      text-transform: uppercase;
      top: 20px;
      transition: top 0.5s, opacity 0.75s ease-in;
    }
  }

  &.branches {
    &:before {
      background-image: url("/static/images/branches.svg");
    }

    .field {
      white-space: break-spaces;
    }
  }

  &.prs {
    &:before {
      background-image: url("/static/images/pull-request.svg");
    }
  }

  &.envlimit {
    &:before {
      background-image: url("/static/images/environments-in-use.svg");
    }
  }

  &.target {
    &:before {
      background-image: url("/static/images/target.svg");
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
      background-image: url("/static/images/members.svg");
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

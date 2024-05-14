import Link from 'next/link';

import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledOrganization = styled.div`
  padding-top: 22px;
  padding-inline: 12px;
  display: flex;
  flex-direction: column;
  @media ${bp.xs_smallUp} {
    min-width: 100%;
    width: 100%;
  }
  .owner-label {
    color: ${color.white};
    background-color: ${color.blue};
    margin-left: 10px;
    padding: 0px 5px 0px 5px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .viewer-label {
    color: ${color.black};
    background-color: ${color.lightestBlue};
    margin-left: 10px;
    padding: 0px 5px 0px 5px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .field-wrapper {
    &::before {
      margin-right: 28px;
      padding-left: 14px;
      left: calc(((-100vw / 16) * 1.5) - 28px);
    }
    @media ${bp.xs_smallUp} {
      min-width: 50%;
      position: relative;
      width: 50%;
    }
    @media ${bp.wideUp} {
      min-width: 33.33%;
      width: 33.33%;
    }
    @media ${bp.extraWideUp} {
      min-width: 25%;
      width: 25%;
    }
    &.quotaProject {
      width: 100%;
      > * {
        padding-left: 14px;
      }

      &::before {
        margin-inline: 14px;
        background-image: url('/static/images/tasks-dark.svg');
        background-size: 15px 20px;
      }
    }
    &.targets {
      width: 50%;
      &::before {
        background-image: url('/static/images/target.svg');
        background-size: 19px 19px;
      }
    }
    &.owners {
      width: 50%;
      &::before {
        background-image: url('/static/images/members.svg');
        background-size: 19px 19px;
      }
    }
    & > div {
      width: 100%;
    }
    .field {
      padding-right: calc((100vw / 16) * 1);
    }
  }
`;

export const StyledOverview = styled.div`
  width: 95.83%;
  padding: 25px;
  background: ${props => props.theme.backgrounds.secondary};
  border: 1px solid ${props => props.theme.borders.box};

  .description {
    margin: 14px 0;
    .title {
      display: block;
      text-transform: uppercase;
      font-size: 13px;
      font-weight: 600;
      color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#5f6f7a')};
    }
    p {
      font-size: 13px;
    }
  }
  .orgname {
    display: inline-block;
    font-size: 22px;
    line-height: 24px;
    margin-bottom: 25px;
  }
  .info {
    display: flex;
    .targetwrapper {
      display: flex;
      flex: 1;
      flex-direction: column;
    }
    .target,
    .user {
      margin-bottom: 8px;
      .person {
        margin: 0 0 1.25rem;

        display: flex;
        align-items: center;
        .email {
          min-width: 220px;
        }
      }
    }
    .targets,
    .users {
      span {
        margin-bottom: 8px;
        text-transform: uppercase;
        display: inline-block;
        font-weight: 600;
        font-size: 13px;
        color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#5f6f7a')};
      }
    }
    .targets {
      .targetIcon {
        transform: translateY(3px);
        margin-right: 14px;
        svg {
          font-size: 18px;
          fill: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#000')};
        }
      }
    }
    .users {
      margin-top: 35px;
      .userIcon {
        transform: translateY(3px);
        margin-right: 14px;
        svg {
          font-size: 18px;
          fill: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#000')};
        }
      }
    }
  }
  .quotas {
    min-width: 50%;
  }
  .quotaField {
    margin-bottom: 55px;
    display: flex;
    flex-direction: column;
    span:first-of-type {
      font-weight: 600;
      font-size: 13px;
      color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#5f6f7a')};
    }
    & > span.disabled {
      pointer-events: none;
      user-select: none;
    }
  }
`;

export const LinkBtn = styled.span`
  margin-top: 25px;
  background: #4b84ff;
  color: #fff;
  display: inline-block;
  min-width: 115px;
  width: max-content;
  padding: 6px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.15s ease;
  &:hover {
    background: #4578e6;
  }
  .icon {
    svg {
      font-size: 22px;
      fill: #fff;
    }
  }
`;

export const ManageBtn = styled.p`
  margin-top: 25px;
  background: #4b84ff;
  color: #fff;
  align-items: center;
  min-width: 115px;
  width: max-content;
  padding: 6px 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.15s ease;
  &:hover {
    background: #4578e6;
  }
  .icon {
    margin-bottom: 0 !important;
    svg {
      font-size: 22px;
      fill: #fff;
    }
  }
`;

import { color } from 'lib/variables';
import styled from 'styled-components';

import { sharedTableStyles } from '../SharedStyles';

export const StyledGroupMembers = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  .OWNER-label {
    color: ${color.white};
    background-color: ${color.lightRed};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .MAINTAINER-label {
    color: ${color.white};
    background-color: ${color.lightBlue};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .DEVELOPER-label {
    color: ${color.white};
    background-color: ${color.teal};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .REPORTER-label {
    color: ${color.darkGrey};
    background-color: ${color.midGrey};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .GUEST-label {
    color: ${color.black};
    background-color: ${color.lightGreen};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .system-user-label {
    color: ${color.white};
    background-color: ${color.black};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  }
  .remove {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    width: 20%;
    max-width: 100px;
    > * {
      all: unset;
      background: ${color.lightRed};
      cursor: pointer;
      border-radius: 0.2rem;
      width: 100%;
      padding: 0.5rem 1rem;
    }
  }
  .name {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    width: 55%;
    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }
  .role {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    .comment {
      font-size: 10px;
    }
    font-weight: normal;
  }
  ${sharedTableStyles}
  .view {
    svg {
      fill: #4578e6;
    }
  }
`;

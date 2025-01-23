import styled, { css } from 'styled-components';

const SharedTextStyles = css`
  color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#000')};
  /* font-family: 'AmericaMono-Regular', sans-serif; */
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  margin: 0;
  overflow-wrap: break-word;
  overflow-x: scroll;
  white-space: pre-wrap;
  will-change: initial;
  word-break: break-all;
  word-wrap: break-word;
`;
export const AccordionTitle = styled.span`
  ${SharedTextStyles}
`;

export const StyledLogs = styled.div`
  .ant-collapse {
    margin-bottom: 0.5rem;
    .log-error-state {
      // lagoon pink
      background-color: rgba(249, 38, 114, 0.1);
    }
    .log-warning-state {
      background-color: rgba(253, 151, 31, 0.1);
      &.log-highlight-disabled {
        background-color: unset;
      }
    }
  }
  .log-viewer {
    ${SharedTextStyles}
    &.with-padding {
      padding: 10px;
    }
  }
  .parseLogs {
    margin: 0 auto 10px;
    .showraw {
      background-color: #222222;
      ${SharedTextStyles}
    }
  }

  .log-text {
    ${SharedTextStyles}
  }
`;

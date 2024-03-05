import { WarningTwoTone } from '@ant-design/icons';
import { color } from 'lib/variables';
import styled from 'styled-components';

export const StyledLogs = styled.div`
  padding: 0 calc(100vw / 16) 48px;
  width: 100%;

  .log-viewer {
    background-color: #222222;
    color: #d6d6d6;
    font-family: 'Monaco', monospace;
    font-size: 12px;
    font-weight: 400;
    margin: 0;
    overflow-wrap: break-word;
    overflow-x: scroll;
    white-space: pre-wrap;
    will-change: initial;
    word-break: break-all;
    word-wrap: break-word;
    &.with-padding {
      padding: 10px;
    }
  }
  .parseLogs {
    margin: 0 auto 10px;

    .showraw {
      margin-left: 10px;
    }
  }
  .log-text {
    padding: 30px;
  }
`;

export const StyledLogAccordion = styled.div`
  &.row-heading {
    position: relative;
    overflow-y: hidden;

    .scroll-wrapper {
      padding: 1em;
      position: absolute;
      right: 0;
      button.scroll {
        padding: 10px;
        width: 44px;
        color: #fff;
        background: #3d3d3d;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        line-height: 1em;
        font-size: 1.5rem;
        opacity: 0;
        transition: opacity 2s ease-in;

        &.hidden {
          opacity: 0;
        }
        &.top,
        &.bottom {
          opacity: 1;
        }
      }

      &.top {
        bottom: 0;
      }
    }
  }
  .accordion-meta-heading {
    display: flex;
    justify-content: flex-start;
    background: ${color.lightestGrey};
    padding: 5px 20px 5px 0;
  }
  .accordion-heading {
    display: flex;
    justify-content: space-between;

    border: 1px solid ${color.lightestGrey};
    background: ${props =>
      props.theme.colorScheme === 'dark'
        ? `${props.theme.backgrounds.primary}`
        : `${props.theme.backgrounds.secondary}`};

    cursor: pointer;
    word-break: break-word;
    > div {
      padding: 0 6px;
    }
  }

  //Log accordion content styling
  .accordion-heading {
    color: ${props => props.theme.texts.accordionHeading};
    border-color: ${props => props.theme.borders.tableRow};
    .log-header {
      &::before {
        background-image: url('/static/images/logs-closed.png');
        background-size: 8px 8px;
        background-color: #497ffa;
        content: ' ';
        background-position: center;
        padding: 22px 16px;
        background-repeat: no-repeat;
        margin: 0 10px 0 0;
      }
      &.visible {
        &::before {
          background-image: url('/static/images/logs-opened.png');
        }
      }
      margin: 20px 12px 20px 0;
      padding: 0;
    }
  }
  &.data-row.log-error-state {
    .accordion-heading {
      .log-header {
        &::before {
          background-color: #e94a4a;
        }
      }
    }
  }
  &.data-row {
    .accordion-heading {
      .log-warning-state {
        margin-top: 1rem;
        &::before {
          color: #000000;
          background-color: #ffbe00;
        }
      }
    }
  }
  &.data-row {
    .accordion-heading-warning {
      color: #000000;
      background-color: #c59d26d4;
    }
  }
`;

export const StyledWarningIcon = styled(WarningTwoTone)`
  margin-right: 0.5rem;
  font-size: 1.25rem;
  svg {
    path {
      &:nth-child(1),
      &:nth-child(2) {
        fill: #fece30;
      }

      &:nth-child(3) {
        fill: black;
      }
    }
  }
`;

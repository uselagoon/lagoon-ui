import { color } from 'lib/variables';
import styled from 'styled-components';

export const StyledAccordion = styled.div`
  .accordion-meta-heading {
    display: flex;
    justify-content: space-between;
    background: ${color.lightestGrey};
    padding: 5px 20px;
  }
  .accordion-heading {
    display: flex;
    justify-content: space-between;
    padding: 20px 12px;
    border: 1px solid ${color.lightestGrey};
    background: ${color.white};
  
    cursor: pointer;
    word-break: break-word;

    &.minified {
      padding: 1em;
    }

    > div {
      padding: 0 6px;
      color: ${props => props.theme.texts.primary}
    }

    &.cols-6 {
      > div {
        width: calc(100% / 6);
        text-align: center;
      }

      .identifier {
        text-align: left;
      }
    }

    .identifier {
      width: 40%;
    }
    .source {
      width: 15%;
    }
    .associatedPackage {
      width: 15%;
    }
    .severity {
      width: 12.5%;
    }
    .created {
      width: 20%;
    }
    .severityScore {
      width: 10%;
    }
    .projectsAffected {
      width: 17.5%;
      text-align: right;
    }
  }
`;

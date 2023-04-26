import { bp, color } from 'lib/variables';
import styled from 'styled-components';

import { commonBg } from './commonPageStyles';

export const ProblemsByDashBoard = styled.div`
  display: flex;
  flex-direction: column;
  ${commonBg};
  .filters-wrapper,
  .project-filter {
    margin: 32px calc((100vw / 16) * 1);
    @media ${bp.wideUp} {
      margin: 32px calc((100vw / 16) * 2);
    }
    @media ${bp.extraWideUp} {
      margin: 32px calc((100vw / 16) * 3);
    }
    .filters {
      display: flex;
      flex-direction: column;
      @media ${bp.wideUp} {
        flex-flow: row;
      }

      &:first-child {
        padding-bottom: 1em;
      }
    }
  }
  .extra-filters {
    padding: 0 15px;
  }
  .content-wrapper {
    flex: 1 0 auto;
    h2 {
      margin: 38px calc((100vw / 16) * 1) 0;
      @media ${bp.wideUp} {
        margin: 62px calc((100vw / 16) * 2) 0;
      }
      @media ${bp.extraWideUp} {
        margin: 62px calc((100vw / 16) * 3) 0;
      }
    }
    .content {
      background: #fff;
      margin: 0 calc((100vw / 16) * 1);
      @media ${bp.wideUp} {
        margin: 0 calc((100vw / 16) * 2);
      }
      @media ${bp.extraWideUp} {
        margin: 0 calc((100vw / 16) * 3);
      }
      li.result {
        display: inline;
      }
    }
    .environment-wrapper {
      padding: 0 1em 1em;
      background: #fefefe;
      margin: 0 0 2em;

      h4 {
        font-weight: 500;
      }
    }
    .data-none {
      display: flex;
      justify-content: space-between;
      padding: 1em;
      border: 1px solid #efefef;
    }
  }

  .project {
    padding: 20px;
    background: rgb(255, 255, 255);
    margin-bottom: 20px;
  }
  .content-wrapper {
    .results {
      margin-bottom: 20px;
      .content {
        background: rgb(241, 241, 241) !important;
        padding: 0px 15px;
        .label {
          color: rgb(95, 111, 122);
          font-family: source-code-pro, sans-serif;
          font-size: 0.8125rem;
          line-height: 1.35417rem;
          text-transform: uppercase;
        }
      }
    }
  }
`;
export const DeploymentWrapper = styled.div`
  flex: 1;
  ${commonBg};
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }

  & > .content {
    width: 100%;
  }
`;

export const DeploymentsWrapper = styled.div`
  ${commonBg};
  flex: 1;
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }

  & > .content {
    padding: 32px calc((100vw / 16) * 1);
    width: 100%;
  }
`;

export const EnvironmentWrapper = styled.div`
  ${commonBg};
  flex: 1;
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }
`;

export const ProblemsDashBoardWrapper = styled.div`
  ${commonBg};
  flex: 1;
  h2 {
    margin: 38px calc((100vw / 16) * 1) 0;
    @media ${bp.wideUp} {
      margin: 62px calc((100vw / 16) * 2) 0;
    }
    @media ${bp.extraWideUp} {
      margin: 62px calc((100vw / 16) * 3) 0;
    }
  }
  & > .content {
    margin: 38px calc((100vw / 16) * 1);
    @media ${bp.wideUp} {
      margin: 38px calc((100vw / 16) * 2);
    }
    @media ${bp.extraWideUp} {
      margin: 38px calc((100vw / 16) * 3);
    }

    li.result {
      display: inline;
      padding: 0 20px 0 0;
    }
  }
`;

export const TasksWrapper = styled.div`
  ${commonBg};
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }

  & > .content {
    padding: 32px calc((100vw / 16) * 1);
    width: 100%;
  }
`;

export const TaskWrapper = styled.div`
  ${commonBg};
  flex: 1;
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }

  & > .content {
    width: 100%;
  }
`;

export const ProjectDetailsWrapper = styled.div`
  @media ${bp.tabletUp} {
    display: flex;
    justify-content: space-between;
  }

  ${commonBg};
  .project-details-sidebar {
    background-color: ${color.lightestGrey};
    border-right: 1px solid ${color.midGrey};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    @media ${bp.tabletUp} {
      min-width: 50%;
      width: 50%;
    }
    @media ${bp.desktopUp} {
      min-width: 40%;
      width: 40%;
    }
    @media ${bp.wideUp} {
      min-width: 33.33%;
      width: 33.33%;
      width: calc((100vw / 16) * 5);
    }
  }

  .environments-wrapper {
    flex-grow: 1;
    padding: 40px calc((100vw / 16) * 1);
  }
`;

export const StyledProblemsDashBoardByProject = styled.div`
  .filters-wrapper,
  .project-filter {
    margin: 32px calc((100vw / 16) * 1);
    @media ${bp.wideUp} {
      margin: 32px calc((100vw / 16) * 2);
    }
    @media ${bp.extraWideUp} {
      margin: 32px calc((100vw / 16) * 3);
    }
    .filters {
      @media ${bp.wideUp} {
        display: flex;
        justify-content: space-between;

        &:first-child {
          padding-bottom: 1em;
        }
      }
    }
  }

  .content-wrapper {
    h2 {
      margin: 38px calc((100vw / 16) * 1) 0;
      @media ${bp.wideUp} {
        margin: 62px calc((100vw / 16) * 2) 0;
      }
      @media ${bp.extraWideUp} {
        margin: 62px calc((100vw / 16) * 3) 0;
      }
    }
    .results {
      padding: 5px 0 5px;
      background: #f3f3f3;
      margin-bottom: 1em;
    }
    .content {
      margin: 0 calc((100vw / 16) * 1);
      @media ${bp.wideUp} {
        margin: 0 calc((100vw / 16) * 2);
      }
      @media ${bp.extraWideUp} {
        margin: 0 calc((100vw / 16) * 3);
      }
      li.result {
        display: inline;
      }
    }
    .projects {
      padding-bottom: 20px;
    }
    .project-overview {
      background: #fff;
    }
    .overview {
      .overview-list {
        margin: 0;
        padding: 0.8em 0;
        background: #f3f3f3;
      }
    }
    .environment-wrapper {
      padding: 0 1em 1em;
      background: #fefefe;
      margin: 0 0 2em;

      h5 {
        margin: 2em 0.5em;
        font-weight: 500;
      }
    }
    .data-none {
      display: flex;
      justify-content: space-between;
      padding: 1em;
      border: 1px solid #efefef;
    }
  }
`;

export const ProblemDashboardFilterWrapper = styled.div`
  margin: 38px calc((100vw / 16) * 1);
  @media ${bp.wideUp} {
    margin: 38px calc((100vw / 16) * 2);
  }
  @media ${bp.extraWideUp} {
    margin: 38px calc((100vw / 16) * 3);
  }
  .filters {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1em;
    flex-direction: column;
    @media ${bp.wideUp} {
      flex-flow: row;
    }
  }
`;

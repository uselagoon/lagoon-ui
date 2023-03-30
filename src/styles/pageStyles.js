import styled from "styled-components";
import { bp, color } from "lib/variables";
import { commonBg } from "./commonPageStyles";

export const ProblemsByDashBoard = styled.div`
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

export const MetadataWrapper = styled.div`
  .content-wrapper {
    @media ${bp.tabletUp} {
      display: flex;
      padding: 0;
    }
  }

  .content {
    padding: 32px calc((100vw / 16) * 1);
    width: 100%;
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

export const VariableWrapper = styled.div`
  ${commonBg};
  flex: 1;
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }
  & > .content {
    width: 100%;
  }
  .notification {
    background-color: ${color.lightBlue};
    color: ${color.white};
    padding: 10px 20px;
    text-align: center;
    width: 80%;
    margin: 0 auto;
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

export const ProjectWrapper = styled.div`
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
  display: flex;
  min-width: 75%;
  flex-direction: column;

  @media ${bp.tabletUp} {
    display: flex;
    justify-content: space-between;
  }

  .environments-production,
  .environments-development {
    max-width: 75%;
  }

  .title h3 {
    margin: 0 0 12px;
  }

  ${commonBg};
  .project-details-header {
    border-right: 1px solid ${color.midGrey};
    padding: 32px calc((100vw / 16) * 1);
    max-width: 75%;
    @media ${bp.tabletUp} {
      padding: 48px calc(((100vw / 16) * 1) + 28px);
    }
    @media ${bp.desktopUp} {
      padding: 48px calc((100vw / 50) * 1) 0;
    }
  }
  .environments-wrapper {
    flex-grow: 1;
    padding: 48px calc((100vw / 50) * 1) 0px calc((100vw / 50) * 1);
    @media ${bp.xs_smallUp} {
      padding: 0px calc((100vw / 16) * 1) 40px calc((100vw / 16) * 1);
    }
    @media ${bp.tabletUp} {
      padding: 0 calc(((100vw / 20) * 1) + 28px) 48px;
    }
    @media ${bp.desktopUp} {
      padding: 0 calc((100vw / 30) * 1) 48px;
    }
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

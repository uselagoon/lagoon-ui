import styled from "styled-components";
import { bp, color } from "lib/variables";

export const DeploymentWrapper = styled.div`
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }

  .content {
    width: 100%;
  }

  .scroll-wrapper {
    position: fixed;
    bottom: 4em;
    right: 2em;
  }
  button.scroll {
    padding: 0.625rem;
    width: 52px;
    color: #fff;
    background: #3d3d3d;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    line-height: 2rem;
    font-size: 2rem;
    opacity: 0;

    -webkit-transition: opacity 2s ease-in;
    -moz-transition: opacity 2s ease-in;
    -ms-transition: opacity 2s ease-in;
    -o-transition: opacity 2s ease-in;
    transition: opacity 2s ease-in;

    &.hidden {
      opacity: 0;
    }
    &.top,
    &.bottom {
      opacity: 1;
    }
  }
`;

export const DeploymentsWrapper = styled.div`
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }

  .content {
    padding: 32px calc((100vw / 16) * 1);
    width: 100%;
  }
`;

export const EnvironmentWrapper = styled.div`
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }
`;

export const ProblemsDashBoardWrapper = styled.div`
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
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }

  .content {
    padding: 32px calc((100vw / 16) * 1);
    width: 100%;
  }
`;

export const TaskWrapper = styled.div`
  @media ${bp.tabletUp} {
    display: flex;
    padding: 0;
  }

  .content {
    width: 100%;
  }
`;

export const ProjectDetailsWrapper = styled.div`
  @media ${bp.tabletUp} {
    display: flex;
    justify-content: space-between;
  }

  .project-details-sidebar {
    background-color: ${color.lightestGrey};
    border-right: 1px solid ${color.midGrey};
    padding: 32px calc((100vw / 16) * 1);
    width: 100%;
    @media ${bp.xs_smallUp} {
      padding: 24px calc((100vw / 16) * 1) 24px
        calc(((100vw / 16) * 1.5) + 28px);
    }
    @media ${bp.tabletUp} {
      min-width: 50%;
      padding: 48px calc(((100vw / 16) * 1) + 28px);
      width: 50%;
    }
    @media ${bp.desktopUp} {
      min-width: 40%;
      padding: 48px calc((100vw / 16) * 1);
      width: 40%;
    }
    @media ${bp.wideUp} {
      min-width: 33.33%;
      min-width: calc((100vw / 16) * 5);
      width: 33.33%;
      width: calc((100vw / 16) * 5);
    }
  }

  .environments-wrapper {
    flex-grow: 1;
    padding: 40px calc((100vw / 16) * 1);
  }
`;

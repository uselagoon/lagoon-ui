import React from 'react';
import css from 'styled-jsx/css';
import ProjectChildPageLink from 'components/link/ProjectChildPageLink';
import { bp, color } from 'lib/variables';

const { className: aClassName, styles: aStyles } = css.resolve`
  a {
    color: ${color.darkGrey};
    display: block;
    padding: 20px 20px 19px 60px;
    @media ${bp.wideUp} {
      padding-left: calc((100vw / 16) * 1);
    }
  }

  .active a {
    color: ${color.black};
  }
`;

const LeftNavTabs = ({ activeTab, project }) => {
  return (
  <ul className="navigation">
    <li
      className={`metadata ${
        activeTab == 'metadata' ? 'active' : ''
      } ${aClassName}`}
    >
      <ProjectChildPageLink
        childPage={'metadata'}
        projectSlug={project}
        className={aClassName}
      >
        Metadata
      </ProjectChildPageLink>
    </li>
    <li
      className={`variables ${
        activeTab == 'variables' ? 'active' : ''
      } ${aClassName}`}
    >
      <ProjectChildPageLink
        childPage={'variables'}
        projectSlug={project}
        className={aClassName}
      >
        Variables
      </ProjectChildPageLink>
    </li>
    <li
      className={`tasks ${
        activeTab == 'tasks' ? 'active' : ''
      } ${aClassName}`}
    >
      <ProjectChildPageLink
        childPage={'tasks'}
        projectSlug={project}
        className={aClassName}
      >
        Tasks
      </ProjectChildPageLink>
    </li>
     <li className={`notifications ${activeTab == 'notifications' ? 'active' : ''} ${aClassName}`}>
      <ProjectChildPageLink
        childPage={'notifications'}
        projectSlug={project}
        className={aClassName}
      >
        Notifications
      </ProjectChildPageLink>
    </li>
    <style jsx>{`
      .navigation {
        background: ${color.lightestGrey};
        border-right: 1px solid ${color.midGrey};
        margin: 0;
        z-index: 10;
        
        @media ${bp.tabletUp} {
          min-width: 30%;
          padding-bottom: 60px;
        }
        @media ${bp.wideUp} {
          min-width: 25%;
        }

        li {
          border-bottom: 1px solid ${color.midGrey};
          margin: 0;
          padding: 0;
          position: relative;

          &:hover {
            background-color: ${color.white};
          }

          &::before {
            background-color: ${color.linkBlue};
            background-position: center center;
            background-repeat: no-repeat;
            content: '';
            display: block;
            height: 59px;
            left: 0;
            position: absolute;
            top: 0;
            transition: all 0.3s ease-in-out;
            width: 45px;
          }

          a {
            color: ${color.darkGrey};
            display: block;
            padding: 20px 20px 19px 60px;
            @media ${bp.wideUp} {
              padding-left: calc((100vw / 16) * 1);
            }
          }

          &.active {
            &::before {
              background-color: ${color.almostWhite};
            }

            background-color: ${color.almostWhite};
            border-right: 1px solid ${color.almostWhite};
            width: calc(100% + 1px);

            a {
              color: ${color.black};
            }
          }

          &.metadata {
            &::before {
              background-image: url('/static/images/overview.svg');
              background-size: 18px;
            }

            &.active::before {
              background-image: url('/static/images/overview-active.svg');
            }
          }

          &.variables {
            &::before {
              background-image: url('/static/images/deployments.svg');
              background-size: 21px 16px;
            }

            &.active::before {
              background-image: url('/static/images/deployments-active.svg');
            }
          }

          &.tasks {
            &::before {
              background-image: url('/static/images/tasks.svg');
              background-size: 16px;
            }

            &.active::before {
              background-image: url('/static/images/tasks-active.svg');
            }
          }

          &.notifications {
            &::before {
              background-image: url('/static/images/facts.svg');
              background-size: 16px;
            }

            &.active::before {
              background-image: url('/static/images/facts-active.svg');
            }
          }
        }
      }
    `}</style>
    {aStyles}
  </ul>
)};

export default LeftNavTabs;

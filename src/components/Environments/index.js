import React, { useState } from 'react';
import * as R from 'ramda';
import css from 'styled-jsx/css';
import EnvironmentLink from 'components/link/Environment';
import Box from 'components/Box';
import { bp, color, fontSize } from 'lib/variables';
import { makeSafe } from 'lib/util';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const bgImages = {
  branch: {
    normal: "url('/static/images/environment-branch.svg')",
    hover: "url('/static/images/environment-branch-hover.svg')"
  },
  pullrequest: {
    normal: "url('/static/images/environment-pull-request.svg')",
    hover: "url('/static/images/environment-pull-request-hover.svg')"
  },
  none: {
    normal: 'none',
    hover: 'none'
  }
};

const { className: boxClassName, styles: boxStyles } = css.resolve`
  .box {
    margin-bottom: 35px;

    .content {
      background-position: right 32px bottom -6px;
      background-repeat: no-repeat;
      background-size: 40px 50px;
      min-height: 122px;
      padding: 10px 15px;
    }
  }
`;

const Environments = ({ environments = [], project }) => {
  const [copied, setCopied] = useState(false);
  if (environments.length === 0) {
    return null;
  }

  return (
    <div className="environments">
      {environments.map(environment => {
        const bgImage = R.propOr(
          bgImages.none,
          environment.deployType,
          bgImages
        );
        const { className: bgClassName, styles: bgStyles } = css.resolve`
          .content {
            background-image: ${bgImage.normal};

            &:hover {
              background-image: ${bgImage.hover};
            }
          }
        `;

        return (
          <div className="environment" key={environment.id}>
              <Box className={`${boxClassName} ${bgClassName}`}>
                <EnvironmentLink
                  environmentSlug={environment.openshiftProjectName}
                  projectSlug={project.name}
                >
                {environment.environmentType == 'production' && (
                  <div className="productionLabel">
                    <span>Production</span>
                  </div>
                )}
                {project.productionEnvironment && project.standbyProductionEnvironment && project.productionEnvironment == makeSafe(environment.name) && (
                  <div className="activeLabel">
                    <span>Active</span>
                  </div>
                )}
                {project.productionEnvironment && project.standbyProductionEnvironment && project.standbyProductionEnvironment == makeSafe(environment.name) && (
                  <div className="standbyLabel">
                    <span>Standby</span>
                  </div>
                )}
                <label>
                  Type: {environment.deployType === 'pullrequest'
                    ? 'PR'
                    : environment.deployType}
                </label>
                <h4>{environment.name}</h4>
                {environment.openshift.friendlyName != null && (
                <label className="clusterLabel">
                Cluster: {environment.openshift.friendlyName}
                </label>
                )}
                {environment.openshift.friendlyName != null && environment.openshift.cloudRegion != null && (
                  <br></br>
                )}
                {environment.openshift.cloudRegion != null && (
                <label className="regionLabel">
                Region: {environment.openshift.cloudRegion}
                </label>
                )}
                </EnvironmentLink>
                {environment.routes
                  ? <div>
                    {/* <span className="copied" style={copied ? { top: '4px', opacity: '0' } : null}>
                      Copied
                    </span> */}
                    <CopyToClipboard
                      text={environment.routes.split(',')[0]}
                      onCopy={() => {
                        setCopied(true);
                        // const timer = setTimeout(() => {
                        //   setCopied(false);
                        // }, 750);
                        // return () => clearTimeout(timer);
                      }}
                    >
                      <span className="copy" />
                    </CopyToClipboard>
                    </div>
              : ''}
              </Box>
            {bgStyles}
          </div>
        );
      })}
      <style jsx>{`
        .environments {
          display: block;
          @media ${bp.tinyUp} {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            &::after {
              content: '';
              flex: auto;
            }
          }
        }

        .environment {
          width: 100%;
          @media ${bp.xs_smallUp} {
            margin-left: 48px;
            min-width: calc(50% - 24px);
            width: calc(50% - 24px);
          }
          @media ${bp.xs_small} {
            &:nth-child(2n + 1) {
              margin-left: 0;
            }
          }
          @media ${bp.tabletUp} {
            margin-left: 0;
            min-width: 100%;
            width: 100%;
          }
          @media ${bp.desktopUp} {
            margin-left: 48px;
            min-width: calc(50% - 24px);
            width: calc(50% - 24px);
          }
          @media ${bp.desktop_extrawide} {
            &:nth-child(2n + 1) {
              margin-left: 0;
            }
          }
          @media ${bp.extraWideUp} {
            min-width: calc((100% / 3) - 32px);
            width: calc((100% / 3) - 32px);
            &:nth-child(3n + 1) {
              margin-left: 0;
            }
          }
        }

        .productionLabel {
          color: ${color.green};
          ${fontSize(13)};
          position: absolute;
          right: -38px;
          text-transform: uppercase;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);

          &::after {
            border-top: 1px solid ${color.grey};
            content: '';
            display: block;
            position: relative;
            right: 12px;
            top: -12px;
            width: calc(100% + 26px);
            z-index: -1;
          }

          span {
            background-color: ${color.white};
            padding: 0 16px;
            z-index: 0;
          }
        }

        .standbyLabel {
          color: ${color.blue};
          ${fontSize(13)};
          position: absolute;
          right: 0px;
          text-transform: uppercase;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);

          &::after {
            border-top: 1px solid ${color.grey};
            content: '';
            display: block;
            position: relative;
            right: 12px;
            top: -12px;
            width: calc(100% + 26px);
            z-index: -1;
          }

          span {
            background-color: ${color.white};
            padding: 0 16px;
            z-index: 0;
          }
        }

        .activeLabel {
          color: ${color.green};
          ${fontSize(13)};
          position: absolute;
          right: 0px;
          text-transform: uppercase;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);

          &::after {
            border-top: 1px solid ${color.grey};
            content: '';
            display: block;
            position: relative;
            right: 12px;
            top: -12px;
            width: calc(100% + 26px);
            z-index: -1;
          }

          span {
            background-color: ${color.white};
            padding: 0 16px;
            z-index: 0;
          }
        }

        label {
          ${fontSize(10)};
          background-color: ${color.lightestGrey};
          border-bottom-right-radius: 15px;
          border-top-right-radius: 15px;
          margin-left: -25px;
          padding: 3px 15px 2px;
        }

        .clusterLabel {
          ${fontSize(10)};
          background-color: ${color.lightestGrey};
          border-bottom-right-radius: 15px;
          border-top-right-radius: 15px;
          margin-left: -25px;
          padding: 3px 15px 2px;
        }

        .regionLabel {
          ${fontSize(10)};
          background-color: ${color.lightestGrey};
          border-bottom-right-radius: 15px;
          border-top-right-radius: 15px;
          margin-left: -25px;
          padding: 3px 15px 2px;
        }

        .copy {
          background: url('/static/images/copy.svg') center center
            no-repeat ${color.white};
          background-size: 16px;
          border-left: 1px solid ${color.lightestGrey};
          bottom: 0;
          height: 33px;
          position: absolute;
          left: 0;
          width: 37px;
          transform: all 0.5s;
          z-index: 20;

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
          left: 0;
          text-transform: uppercase;
          top: 30px;
          transition: top 0.5s, opacity 0.75s ease-in;
        }
      `}</style>
      {boxStyles}
    </div>
  );
};

export default Environments;
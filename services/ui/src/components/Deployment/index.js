import React, { useEffect, useRef, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import CancelDeployment from 'components/CancelDeployment';
import LogViewer from 'components/LogViewer';
import { bp } from 'lib/variables';

export const getDeploymentDuration = deployment => {
  const deploymentStart = deployment.started || deployment.created;
  const durationStart =
    (deploymentStart && moment.utc(deploymentStart)) || moment.utc();
  const durationEnd =
    (deployment.completed && moment.utc(deployment.completed)) || moment.utc();
  const duration = moment
    .duration(durationEnd - durationStart)
    .format('HH[hr] mm[m] ss[sec]');

  return duration;
};

/**
 * Displays information about a deployment.
 */
const Deployment = ({ deployment }) => {
  const logsTopRef = useRef(null);
  const logsEndRef = useRef(null);
  const [bottom, setBottom] = useState(true);
  const [top, setTop] = useState(false);

  const scrollToTop = () => {
    logsTopRef.current.scrollIntoView({ behavior: "smooth" });
    setTop(false);
    setBottom(true);
  };

  const scrollToBottom = () => {
    logsEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const onScroll = () => {
    const pageBottom = document.body.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight;
    if (pageBottom) {
      setTop(true);
      setBottom(false);
    }
    else {
      setTop(!!top);
      setBottom(!!bottom);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    if (deployment.status !== "complete") {
      scrollToBottom();
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [deployment]);

  return (
    <div className="deployment">
      <div ref={logsTopRef} />
      <div className="details">
        <h3>{deployment.name}</h3>
        <div className="field-wrapper created">
          <div>
            <label>Created</label>
            <div className="field">
              {moment
                .utc(deployment.created)
                .local()
                .format('DD MMM YYYY, HH:mm:ss (Z)')}
            </div>
          </div>
        </div>
        <div className={`field-wrapper status ${deployment.status}`}>
          <div>
            <label>Status</label>
            <div className="field">
              {deployment.status.charAt(0).toUpperCase() +
                deployment.status.slice(1)}
            </div>
          </div>
        </div>
        <div className="field-wrapper duration">
          <div>
            <label>Duration</label>
            <div className="field">{getDeploymentDuration(deployment)}</div>
          </div>
        </div>
        {['new', 'pending', 'running'].includes(deployment.status) && (
          <CancelDeployment deployment={deployment} />
        )}
      </div>
      <LogViewer logs={deployment.buildLog} />
      <div ref={logsEndRef} />
      <div className="scroll-wrapper">
        {!bottom &&
        <Button className="scroll" onClick={() => scrollToTop()}>
          <Icon fitted name='chevron up' />
        </Button>
        }
        {!top &&
        <Button className="scroll" onClick={() => scrollToBottom()}>
          <Icon fitted name='chevron down' />
        </Button>
        }
      </div>
      <style jsx>{`
        .details {
          padding: 104px calc(100vw / 16) 20px;
          width: 100%;

          @media ${bp.xs_smallUp} {
            display: flex;
            flex-wrap: wrap;
            min-width: 100%;
            padding-left: calc(((100vw / 16) * 1.5) + 28px);
            position: relative;
            width: 100%;
          }

          @media ${bp.tabletUp} {
            padding: 120px calc(100vw / 16) 20px calc(((100vw / 16) * 1.5) + 28px);
          }
          @media ${bp.extraWideUp} {
            padding-left: calc(100vw / 16);
            padding-top: 48px;
          }

          h3 {
            width: 100%;
            @media ${bp.xs_smallUp} {
              left: calc(100vw / 16);
              position: absolute;
              top: 32px;
            }
            @media ${bp.tabletUp} {
              top: 48px;
            }
            @media ${bp.extraWideUp} {
              min-width: 25%;
              padding-right: 60px;
              position: initial;
              width: 25%;
            }
          }

          .field-wrapper {
            &::before {
              left: calc(((-100vw / 16) * 1.5) - 28px);
            }
            @media ${bp.xs_smallUp} {
              min-width: 50%;
              position: relative;
              width: 50%;
            }
            @media ${bp.desktopUp} {
              min-width: 33.33%;
              min-width: calc(100% / 3);
              width: 33.33%;
              width: calc(100% / 3);
            }
            @media ${bp.extraWideUp} {
              min-width: 20%;
              width: 25%;
            }

            &.created {
              &::before {
                background-image: url('/images/created.svg');
                background-size: 17px 16px;
              }
            }

            &.duration {
              &::before {
                background-image: url('/images/duration.svg');
                background-size: 17px;
              }
            }

            &.status {
              &::before {
                background-size: 14px;
              }

              &.new {
                &::before {
                  background-image: url('/images/pending.svg');
                }
              }

              &.pending {
                &::before {
                  background-image: url('/images/pending.svg');
                }
              }

              &.running {
                &::before {
                  background-image: url('/images/in-progress.svg');
                }
              }

              &.cancelled {
                &::before {
                  background-image: url('/images/failed.svg');
                }
              }

              &.error {
                &::before {
                  background-image: url('/images/failed.svg');
                }
              }

              &.failed {
                &::before {
                  background-image: url('/images/failed.svg');
                }
              }

              &.complete {
                &::before {
                  background-image: url('/images/successful.svg');
                }
              }
            }

            & > div {
              width: 100%;
            }

            .field {
              padding-right: calc((100vw / 16) * 1);
              @media ${bp.extraWideUp} {
                padding-right: calc((100vw / 16) * 0.5);
              }
            }
          }
        }
      `}</style>
    </div>
  )
};

export default Deployment;

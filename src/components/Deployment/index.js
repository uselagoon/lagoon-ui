import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import CancelDeployment from 'components/CancelDeployment';
import BulkDeploymentLink from 'components/link/BulkDeployment';
import LogViewer from 'components/LogViewer';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import Button from 'components/Button';
import { ButtonRow, DeploymentDetails, FieldWrapper } from './StyledDeployment';

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

const withParseLogsState = withState("checkedParseState", "setParseStateChecked", true);

const withParseLogsStateHandlers = withHandlers({
  changeState: ({setParseStateChecked, checkedParseState}) => (e) => {setParseStateChecked(!checkedParseState);},
})

/**
 * Displays information about a deployment.
 */
const Deployment = ({ deployment, checkedParseState, changeState }) => (
  <div className="deployment">
    <DeploymentDetails>
      <FieldWrapper className="created">
        <div>
          <label>Created</label>
          <div className="field">
            {moment
              .utc(deployment.created)
              .local()
              .format('DD MMM YYYY, HH:mm:ss (Z)')}
          </div>
        </div>
      </FieldWrapper>
      <FieldWrapper className={`status ${deployment.status}`}>
        <div>
          <label>Status</label>
          <div className="field">
            {deployment.status.charAt(0).toUpperCase() +
              deployment.status.slice(1)}
          </div>
        </div>
      </FieldWrapper>
      <FieldWrapper className="duration">
        <div>
          <label>Duration</label>
          <div className="field">{getDeploymentDuration(deployment)}</div>
        </div>
      </FieldWrapper>
      <FieldWrapper className="logstatus">
        <div>
        <label>Log view</label>
        <div className="field">
          <Button action={changeState}>
            {checkedParseState ? "View raw" : "View parsed"}
          </Button>
        </div>
        </div>
      </FieldWrapper>
      {deployment.bulkId &&<FieldWrapper className="bulk">
        <div>
          <label>Bulk Deployment</label>
          <div className="field">
          <BulkDeploymentLink
            bulkIdSlug={deployment.bulkId}
          >
            View bulk deployment
          </BulkDeploymentLink>
          </div>
        </div>
      </FieldWrapper>}
    </DeploymentDetails>
    <ButtonRow>
    {['new', 'pending', 'queued', 'running'].includes(deployment.status) && (
        <CancelDeployment deployment={deployment} />
      )}
    </ButtonRow>
    <LogViewer logs={deployment.buildLog} status={deployment.status} checkedParseState={checkedParseState} forceLastSectionOpen={true}/>
  </div>
);

export default withParseLogsState(withParseLogsStateHandlers(Deployment));

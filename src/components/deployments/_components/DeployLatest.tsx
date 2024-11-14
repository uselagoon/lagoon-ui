import { Fragment } from 'react';

import { DeploymentsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/deployments/(deployments-page)/page';
import deployEnvironmentLatest from '@/lib/mutation/deployEnvironmentLatest';
import { CarryOutOutlined, LoadingOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { RefetchFunction } from '@apollo/client/react/hooks/useSuspenseQuery';
import { Button, LoadingSkeleton, useNotification } from '@uselagoon/ui-library';
import { message } from 'antd';

import { StyledNewDeployment, StyledQuickAction } from './styles';

interface Props {
  environment: DeploymentsData['environment'];
  renderAsQuickAction?: boolean;
  refetch?: RefetchFunction<
    DeploymentsData,
    {
      openshiftProjectName: string;
      limit: null | number;
    }
  >;
  skeleton?: false;
}
interface PropsWithSkeleton {
  skeleton: true;
}

const DeployLatest = (props: Props | PropsWithSkeleton) => {
  if (props.skeleton) {
    return (
      <StyledNewDeployment>
        <div className="description">
          Start a new deployment of <LoadingSkeleton width={60} />
        </div>
        <Button size="middle">Deploy</Button>
      </StyledNewDeployment>
    );
  }
  const { environment, renderAsQuickAction = false } = props;
  const { id, deployType, deployBaseRef, deployHeadRef, deployTitle } = environment;

  const [deployEnvironmentLatestMutation, { loading, error }] = useMutation(deployEnvironmentLatest, {
    onError: err => {
      console.error(err);
      if (renderAsQuickAction) {
        message.error('Deployment failed');
      } else {
        errorNotification.trigger();
      }
    },
    variables: {
      environmentId: id,
    },
    onCompleted: () => {
      if (renderAsQuickAction) {
        message.success('Deployment successful');
      } else {
        successNotification.trigger();
      }
    },
    refetchQueries: renderAsQuickAction ? ['getProject'] : ['getEnvironment'],
  });

  // error and success notifications
  const errorNotification = useNotification({
    type: 'error',
    title: 'Deployment failed',
    content: error?.message,
    requiresManualClose: true,
  });

  const successNotification = useNotification({
    type: 'success',
    title: 'Deployment successful',
    content: null,
    requiresManualClose: false,
  });

  let deploymentsEnabled = true;

  if (deployType === 'branch' || deployType === 'promote') {
    if (!deployBaseRef) {
      deploymentsEnabled = false;
    }
  } else if (deployType === 'pullrequest') {
    if (!deployBaseRef && !deployHeadRef && !deployTitle) {
      deploymentsEnabled = false;
    }
  } else {
    deploymentsEnabled = false;
  }

  // used as a quick action on /projects/[projectName] route
  if (renderAsQuickAction) {
    return (
      <StyledQuickAction onClick={() => !deploymentsEnabled && deployEnvironmentLatestMutation()}>
        {loading ? <LoadingOutlined /> : <CarryOutOutlined />}
        <span>Trigger a deployment from {environment.name}</span>
      </StyledQuickAction>
    );
  }

  return (
    <StyledNewDeployment>
      <Fragment key="success-notification-holder">{successNotification.contextHolder}</Fragment>
      <Fragment key="error-notification-holder"> {errorNotification.contextHolder}</Fragment>
      {!deploymentsEnabled ? (
        <>
          <div className="description">Manual deployments are not available for this environment.</div>
          <Button size="middle" disabled>
            Deploy
          </Button>
        </>
      ) : (
        <>
          <div className="description">
            {deployType === 'branch' && `Start a new deployment of branch ${deployBaseRef}.`}
            {deployType === 'pullrequest' && `Start a new deployment of pull request ${deployTitle}.`}
            {deployType === 'promote' &&
              `Start a new deployment from environment ${environment.project.name}-${deployBaseRef}.`}
          </div>
          <Button size="middle" loading={loading} onClick={() => deployEnvironmentLatestMutation()}>
            Deploy
          </Button>
        </>
      )}
    </StyledNewDeployment>
  );
};

export default DeployLatest;

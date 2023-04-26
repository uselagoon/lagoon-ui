import DeploymentNotFound from 'components/errors/DeploymentNotFound';
import EnvironmentNotFound from 'components/errors/EnvironmentNotFound';
import ProblemNotFound from 'components/errors/ProblemNotFound';
import ProjectNotFound from 'components/errors/ProjectNotFound';
import TaskNotFound from 'components/errors/TaskNotFound';
import renderWhile from 'lib/renderWhile';
import * as R from 'ramda';

const noProp = R.complement(R.prop);
const noEnvironmentData = noProp('environment');
const noProjectData = noProp('project');

export const withEnvironmentRequired = renderWhile(({ data }) => noEnvironmentData(data), EnvironmentNotFound);

export const withTaskRequired = renderWhile(({ data: { environment } }) => !environment.tasks.length, TaskNotFound);

export const withProblemRequired = renderWhile(
  ({ data: { environment } }) => !environment.problem.id === null,
  ProblemNotFound
);

export const withDeploymentRequired = renderWhile(
  ({ data: { environment } }) => !environment.deployments.length,
  DeploymentNotFound
);

export const withProjectRequired = renderWhile(({ data }) => noProjectData(data), ProjectNotFound);

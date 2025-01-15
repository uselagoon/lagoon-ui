import { FC, startTransition, useReducer } from 'react';

import { env } from 'next-runtime-env';

import deployEnvironmentBranch from '@/lib/mutation/deployEnvironmentBranch';
import projectByNameWithDeployKeyQuery from '@/lib/query/projectByNameWithDeployKeyQuery';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { CopyToClipboard, FormItem, Input, LagoonCard, Text, Tip, useNotification } from '@uselagoon/ui-library';

import { ContentWrapper, StepWrapper } from './_components/styles';

type Props = {
  projectName: string;
  renderType?: 'card' | 'listItem';
  refetch: () => void;
};
export const NewEnvironment: FC<Props> = ({ projectName, renderType = 'card', refetch }) => {
  const { error, data: deployKeyValue } = useQuery(projectByNameWithDeployKeyQuery, {
    variables: { name: projectName },
  });

  const [key, forceUpdate] = useReducer(x => x + 1, 0);

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: 'There was a problem creating environment.',
    placement: 'top',
    duration: 0,
    content: null,
  });

  const [deployEnvironmentBranchMutation, { data, loading }] = useMutation(deployEnvironmentBranch, {
    variables: {
      project: projectName,
    },
  });

  let dkValue = '';
  if (deployKeyValue) {
    dkValue = deployKeyValue.project.publicKey;
  }

  if (error) console.error(error);

  const WEBHOOK_URL = env('WEBHOOK_URL');

  const webhookURL = WEBHOOK_URL ? WEBHOOK_URL : 'https://webhook-handler.example.com';

  const createModalStep1 = (
    <>
      <StepWrapper>
        <FormItem required rules={[{ required: true, message: '' }]} label="Branch name" name="branch_name">
          <Input placeholder="Enter a branch name" />
        </FormItem>
      </StepWrapper>
      <Tip content="Add the branch you wish to build this environment from. This branch must already exist in your git repository." />
    </>
  );

  const createModalStep2 = (
    <>
      <StepWrapper>
        <Text className="description">Add this project's Deploy Key to your Git service:</Text>
        <div data-id="copy">
          <CopyToClipboard type="hiddenWithIcon" text={dkValue} width={400} />
        </div>
      </StepWrapper>
      <Tip
        content={
          <>
            A Deploy key is used to access a repository from an external host eg Lagoon. Each Git provider has a
            slightly different process, please follow your providers guide:
            <ContentWrapper>
              <a
                target="_blank"
                href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#deploy-keys"
              >
                GitHub
              </a>
              <a target="_blank" href="https://docs.gitlab.com/ee/user/project/deploy_keys/">
                GitLab
              </a>
              <a
                target="_blank"
                href="https://support.atlassian.com/bitbucket-cloud/docs/configure-repository-settings/"
              >
                Bitbucket
              </a>
            </ContentWrapper>
          </>
        }
      />
    </>
  );

  const createModalStep3 = (
    <>
      <StepWrapper>
        <Text className="description">Add the webhook to your Git service:</Text>
        <div data-id="webhook">
          <CopyToClipboard type="visible" text={webhookURL} />
        </div>
      </StepWrapper>
      <Tip
        content={
          <>
            Webhooks allow apps or systems to communicate with each other. Each Git provider has a slightly different
            process, please follow your providers guide:
            <ContentWrapper>
              <a target="_blank" href="https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks">
                GitHub
              </a>
              <a target="_blank" href="https://docs.gitlab.com/ee/user/project/integrations/webhooks.html">
                GitLab
              </a>
              <a target="_blank" href="https://support.atlassian.com/bitbucket-cloud/docs/manage-webhooks/">
                Bitbucket
              </a>
            </ContentWrapper>
          </>
        }
      />
    </>
  );

  const newEnvSteps = [createModalStep1, createModalStep2, createModalStep3];

  const createEnvironment = async (fields: Record<string, unknown>) => {
    try {
      await deployEnvironmentBranchMutation({
        variables: {
          branch: fields.branch_name,
        },
      });

      startTransition(() => {
        refetch();
      });
    } catch (err) {
      console.error(err);
      trigger({ content: (err as ApolloError).message });
    }
    forceUpdate();
  };
  return (
    <>
      {contextHolder}
      <LagoonCard
        type="new"
        key={key}
        renderType={renderType}
        loading={loading}
        requiredFormItems={['branch_name']}
        onCreateEnvironment={createEnvironment}
        steps={newEnvSteps}
      />
    </>
  );
};

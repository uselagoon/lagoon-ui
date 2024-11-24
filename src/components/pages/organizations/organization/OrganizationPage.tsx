'use client';

import { OrganizationData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/(organization-overview)/page';
import { AddUser } from '@/components/addUserToOrg/Adduser';
import { CreateGroup } from '@/components/createGroup/CreateGroup';
import { CreateProject } from '@/components/createProject/CreateProject';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Details, Head2 } from '@uselagoon/ui-library';

import { Description } from './_components/Description';
import { OrgActionsWrapper, OrgDeployTargets } from './_components/styles';

export default function OrganizationPage({
  queryRef,
  orgSlug,
}: {
  queryRef: QueryRef<OrganizationData>;
  orgSlug: string;
}) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { organization },
  } = useReadQuery(queryRef);

  const deployTargets = organization.deployTargets.map(target => <div>{target.name}</div>);

  const orgDetailedItems = [
    {
      key: 'org_id',
      label: 'ORG ID',
      children: organization.id,
    },
    {
      key: 'org_name',
      label: 'ORG NAME',
      children: organization.name,
    },
    {
      key: 'groups',
      label: 'GROUPS',
      children: (
        <>
          Group quota: {organization.groups.length} of{' '}
          {organization.quotaGroup === -1 ? 'unlimited' : organization.quotaGroup}
        </>
      ),
    },
    {
      key: 'projects',
      label: 'PROJECTS',
      children: (
        <>
          Project quota: {organization.projects.length} of{' '}
          {organization.quotaProject === -1 ? 'unlimited' : organization.quotaProject}
        </>
      ),
    },
    {
      key: 'notifications',
      label: 'NOTIFICATIONS',
      children: (
        <>
          Notification quota: {organization.quotaNotification} of{' '}
          {organization.quotaNotification === -1 ? 'unlimited' : organization.quotaNotification}
        </>
      ),
    },
    {
      key: 'environments',
      label: 'ENVIRONMENTS',
      children: (
        <>
          Environment quota: {organization.environments.length} of{' '}
          {organization.quotaEnvironment === -1 ? 'unlimited' : organization.quotaEnvironment}
        </>
      ),
    },
    {
      key: 'dev_envs',
      label: 'AVAILABLE DEPLOY TARGETS',
      contentStyle: {
        padding: 0,
      },
      children: <OrgDeployTargets>{deployTargets}</OrgDeployTargets>,
    },
  ];

  return (
    <>
      <Head2>Organization Details</Head2>
      <Description
        orgId={organization.id}
        name={organization.friendlyName || organization.name}
        description={organization.description}
      />

      <Head2>Create</Head2>
      <OrgActionsWrapper>
        <CreateProject
          organizationId={organization.id}
          options={organization.deployTargets.map(deploytarget => {
            return { label: deploytarget.name, value: deploytarget.id };
          })}
        />
        <CreateGroup organizationId={organization.id} existingGroupNames={organization.groups.map(g => g.name)} />
        <AddUser />
      </OrgActionsWrapper>

      <Details type="topToBottom" bordered items={orgDetailedItems} />
    </>
  );
}

'use client';

import { OrganizationData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/(organization-overview)/page';
import { AddUser } from '@/components/addUserToOrg/Adduser';
import { CreateGroup } from '@/components/createGroup/CreateGroup';
import { CreateProject } from '@/components/createProject/CreateProject';
import OrganizationNotFound from '@/components/errors/OrganizationNotFound';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { DetailedStats, Details, Head2 } from '@uselagoon/ui-library';

import { Description } from './_components/Description';
import { OrgActionsWrapper, OrgDeployTargets } from './_components/styles';

type Notification = 'slacks' | 'rocketchats' | 'webhook' | 'teams' | 'emails';
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

  if (!organization) {
    return <OrganizationNotFound orgName={orgSlug} />;
  }

  const deployTargets = organization.deployTargets.map(target => <div>{target.name}</div>);

  const groupCount = Object.values(organization.groups).filter(group => group.type !== 'project-default-group').length;

  const totalNotificationCount = ['slacks', 'rocketchats', 'webhook', 'teams', 'emails'].reduce(
    (acc, key) => acc + (organization[key as Notification] ? organization[key as Notification].length : 0),
    0
  );

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
      lowercaseValue: true,
    },
    {
      key: 'groups',
      label: 'GROUPS',
      children: (
        <>
          Group quota: {groupCount} of {organization.quotaGroup === -1 ? 'unlimited' : organization.quotaGroup}
        </>
      ),
      capitalizeValue: true,
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
      capitalizeValue: true,
    },
    {
      key: 'notifications',
      label: 'NOTIFICATIONS',
      children: (
        <>
          Notification quota: {totalNotificationCount} of{' '}
          {organization.quotaNotification === -1 ? 'unlimited' : organization.quotaNotification}
        </>
      ),
      capitalizeValue: true,
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
      capitalizeValue: true,
    },
    ...organization.deployTargets?.map(target => {
      return {
        key: `target_${String(target.id)}`,
        label: 'AVAILABLE DEPLOY TARGET',
        children: target.name,
        lowercaseValue: true,
      };
    }),
  ];

  const deployTargetOptions = organization.deployTargets.map(deploytarget => {
    return { label: deploytarget.name, value: deploytarget.id };
  });
  const existingGroupNames = organization.groups.map(g => g.name);

  const groupSelectOptions = organization.groups.map(group => {
    return { value: group.name, label: group.name };
  });

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
        <CreateProject organizationId={organization.id} options={deployTargetOptions} />
        <CreateGroup organizationId={organization.id} existingGroupNames={existingGroupNames} />
        <AddUser groupOptions={groupSelectOptions} type="multiple" />
      </OrgActionsWrapper>

      <DetailedStats items={orgDetailedItems} />
    </>
  );
}

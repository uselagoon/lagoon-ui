'use client';

import { ProjectDetailsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/project-details/page';
import dayjs from '@/lib/dayjs';
import { CopyToClipboard, DetailedStats } from '@uselagoon/ui-library';
import giturlparse from 'git-url-parse';

import { StyledGitLink } from './styles';

interface ProjectDetailsProps {
  project: ProjectDetailsData['project'];
}

export default function ProjectDetailsPage(props: ProjectDetailsProps) {
  const { project } = props;
  let gitUrlParsed;
  try {
    gitUrlParsed = giturlparse(project.gitUrl);
  } catch {
    gitUrlParsed = null;
  }

  const gitLink = gitUrlParsed ? `${gitUrlParsed.resource}/${gitUrlParsed.full_name}` : '';
  const formattedDate = dayjs.utc(project.created).local().format('DD MMM YYYY, HH:mm:ss (Z)');
  const developEnvironmentCount = project.environments.filter(env => env.environmentType === 'development').length;

  const detailItems = [
    {
      key: 'created',
      label: 'CREATED',
      children: formattedDate,
      lowercaseValue: true,
    },
    {
      key: 'origin',
      label: 'ORIGIN',
      children: (
        <StyledGitLink className="hover-state" data-cy="gitLink" target="_blank" href={`https://${gitLink}`}>
          {gitLink}
        </StyledGitLink>
      ),
      lowercaseValue: true,
    },
    {
      key: 'giturl',
      label: 'GIT URL',
      children: <CopyToClipboard fontSize="1.2rem" type="visible" withToolTip text={project.gitUrl} />,
      lowercaseValue: true,
    },
    {
      key: 'branches',
      label: 'BRANCHES ENABLED',
      children: project.branches,
      lowercaseValue: true,
    },
    {
      key: 'pulls',
      label: 'PULL REQUESTS ENABLED',
      children: project.pullrequests,
      lowercaseValue: true,
    },
    {
      key: 'dev_envs',
      label: 'DEVELOPMENT ENVIRONMENTS IN USE',
      children: (
        <>
          {developEnvironmentCount} of {project.developmentEnvironmentsLimit}{' '}
        </>
      ),
      lowercaseValue: true,
    },
  ];
  return <DetailedStats items={detailItems} />;
}

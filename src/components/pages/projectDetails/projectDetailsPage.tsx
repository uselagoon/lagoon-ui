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
    },
    {
      key: 'origin',
      label: 'ORIGIN',
      children: (
        <StyledGitLink className="hover-state" data-cy="gitLink" target="_blank" href={`https://${gitLink}`}>
          {gitLink}
        </StyledGitLink>
      ),
    },
    {
      key: 'giturl',
      label: 'GIT URL',
      children: <CopyToClipboard fontSize="1.5rem" type="visible" withToolTip text={project.gitUrl} />,
    },
    {
      key: 'branches',
      label: 'BRANCHES ENABLED',
      children: String(!!project.branches).charAt(0).toUpperCase() + String(!!project.branches).substring(1),
    },
    {
      key: 'pulls',
      label: 'PULL REQUESTS ENABLED',
      children: String(!!project.pullrequests).charAt(0).toUpperCase() + String(!!project.pullrequests).substring(1),
    },
    {
      key: 'dev_envs',
      label: 'DEVELOPMENT ENVIRONMENTS IN USE',
      children: (
        <>
          {developEnvironmentCount} of {project.developmentEnvironmentsLimit}{' '}
        </>
      ),
    },
  ];
  return <DetailedStats items={detailItems} />;
}

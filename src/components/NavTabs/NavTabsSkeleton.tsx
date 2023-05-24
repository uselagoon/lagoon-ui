import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import BackupsLink from 'components/link/Backups';
import DeploymentsLink from 'components/link/Deployments';
import EnvironmentLink from 'components/link/Environment';
import TasksLink from 'components/link/Tasks';
import useTranslation from 'lib/useTranslation';

import { StyledNavigation } from './StylednavTabs';

interface NavSkeletonProps {
  activeTab: string;
  projectName: string;
  openshiftProjectName: string;
}

const NavTabsSkeleton: FC<NavSkeletonProps> = ({ activeTab, projectName, openshiftProjectName }) => {
  const t = useTranslation();
  return (
    <StyledNavigation className="navigation">
      <li className={`overview ${activeTab == 'overview' ? 'active' : ''} deployLink`}>
        <EnvironmentLink environmentSlug={openshiftProjectName} projectSlug={projectName} className="deployLink">
          {t('environment.nav.overview')}
        </EnvironmentLink>
      </li>
      <li className={`deployments ${activeTab == 'deployments' ? 'active' : ''} deployLink`}>
        <DeploymentsLink environmentSlug={openshiftProjectName} projectSlug={projectName} className="deployLink">
          {t('environment.nav.deployments')}
        </DeploymentsLink>
      </li>
      <li className={`backups ${activeTab == 'backups' ? 'active' : ''} deployLink`}>
        <BackupsLink environmentSlug={openshiftProjectName} projectSlug={projectName} className="deployLink">
          {t('environment.nav.backups')}
        </BackupsLink>
      </li>
      <li className={`tasks ${activeTab == 'tasks' ? 'active' : ''} ${'deployLink'}`}>
        <TasksLink environmentSlug={openshiftProjectName} projectSlug={projectName} className="deployLink">
          {t('environment.nav.tasks')}
        </TasksLink>
      </li>
      <Skeleton style={{ height: '50px', lineHeight: '0.5' }} />
      <Skeleton style={{ height: '50px', lineHeight: '0.5' }} />
    </StyledNavigation>
  );
};

export default NavTabsSkeleton;

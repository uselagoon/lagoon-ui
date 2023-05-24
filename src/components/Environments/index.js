import React from 'react';

import Box from 'components/Box';
import EnvironmentLink from 'components/link/Environment';
import useTranslation from 'lib/useTranslation';
import { makeSafe } from 'lib/util';
import * as R from 'ramda';

import { StyledEnvironments } from './StyledEnvironments';

const bgImages = {
  branch: {
    normal: "url('/static/images/environment-branch.svg')",
    hover: "url('/static/images/environment-branch-hover.svg')",
  },
  pullrequest: {
    normal: "url('/static/images/environment-pull-request.svg')",
    hover: "url('/static/images/environment-pull-request-hover.svg')",
  },
  none: {
    normal: 'none',
    hover: 'none',
  },
};

const Environments = ({ environments = [], project }) => {
  const t = useTranslation();
  if (environments.length === 0) {
    return null;
  }

  return (
    <StyledEnvironments className="environments">
      {environments.map(environment => {
        const bgImage = R.propOr(bgImages.none, environment.deployType, bgImages);
        const activeEnvironment =
          project.productionEnvironment &&
          project.standbyProductionEnvironment &&
          project.productionEnvironment == makeSafe(environment.name);
        const standbyEnvironment =
          project.productionEnvironment &&
          project.standbyProductionEnvironment &&
          project.standbyProductionEnvironment == makeSafe(environment.name);

        return (
          <div className="environment" key={environment.id}>
            <Box className="box" activeBgs={[bgImage.normal, bgImage.hover]}>
              <EnvironmentLink environmentSlug={environment.openshiftProjectName} projectSlug={project.name}>
                {environment.environmentType == 'production' && (
                  <div className="productionLabel">
                    <span>{t('project.production')}</span>
                  </div>
                )}
                {activeEnvironment && (
                  <div className="activeLabel">
                    <span>{t('project.active')}</span>
                  </div>
                )}
                {standbyEnvironment && (
                  <div className="standbyLabel">
                    <span>{t('project.standby')}</span>
                  </div>
                )}
                <label>
                  {t('project.type')}: {environment.deployType === 'pullrequest' ? 'PR' : environment.deployType}
                </label>
                <h4>{environment.name}</h4>
                {environment.openshift.friendlyName != null && (
                  <label className="clusterLabel">
                    {t('project.cluster')}: {environment.openshift.friendlyName}
                  </label>
                )}
                {environment.openshift.friendlyName != null && environment.openshift.cloudRegion != null && <br></br>}
                {environment.openshift.cloudRegion != null && (
                  <label className="regionLabel">
                    {t('project.region')}: {environment.openshift.cloudRegion}
                  </label>
                )}
              </EnvironmentLink>
              {environment.routes && environment.routes !== 'undefined' ? (
                <div className="routeLink field">
                  <label>
                    {standbyEnvironment || activeEnvironment ? (
                      <a
                        className="hover-state"
                        href={standbyEnvironment ? project.standbyRoutes : project.productionRoutes}
                        target="_blank"
                      >
                        {t('project.route')}
                      </a>
                    ) : (
                      <a className="hover-state" href={environment.routes.split(',')[0]} target="_blank">
                        {t('project.route')}
                      </a>
                    )}
                  </label>
                </div>
              ) : (
                ''
              )}
            </Box>
          </div>
        );
      })}
    </StyledEnvironments>
  );
};

export default Environments;

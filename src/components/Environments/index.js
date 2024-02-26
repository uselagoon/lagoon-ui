import React from 'react';

import Box from 'components/Box';
import EnvironmentLink from 'components/link/Environment';
import { makeSafe } from 'lib/util';
import * as R from 'ramda';

import { StyledEnvironments } from './StyledEnvironments';
import NewEnvironment from "../NewEnvironment";

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

const Environments = ({ environments = [], project, refresh, environmentCount }) => {
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
                    <span>Production</span>
                  </div>
                )}
                {activeEnvironment && (
                  <div className="activeLabel">
                    <span>Active</span>
                  </div>
                )}
                {standbyEnvironment && (
                  <div className="standbyLabel">
                    <span>Standby</span>
                  </div>
                )}
                <label>Type: {environment.deployType === 'pullrequest' ? 'PR' : environment.deployType}</label>
                <h4 data-cy="environment-name">{environment.name}</h4>
                {environment.openshift.friendlyName != null && (
                  <label className="clusterLabel">Cluster: {environment.openshift.friendlyName}</label>
                )}
                {environment.openshift.friendlyName != null && environment.openshift.cloudRegion != null && <br></br>}
                {environment.openshift.cloudRegion != null && (
                  <label className="regionLabel">Region: {environment.openshift.cloudRegion}</label>
                )}
              </EnvironmentLink>
              {environment.routes && environment.routes !== 'undefined' ? (
                <div className="routeLink field" data-cy="route-link">
                  <label data-cy="route-label">
                    {standbyEnvironment || activeEnvironment ? (
                      <a
                        className="hover-state"
                        href={standbyEnvironment ? project.standbyRoutes : project.productionRoutes}
                        target="_blank"
                      >
                        Route
                      </a>
                    ) : (
                      <a className="hover-state" href={environment.routes.split(',')[0]} target="_blank">
                        Route
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
      <NewEnvironment refresh={refresh} inputProjectName={project.name} productionEnvironment={project.productionEnvironment} environmentCount={environmentCount}/>
    </StyledEnvironments>
  );
};

export default Environments;

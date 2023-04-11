import React from 'react';
import moment from 'moment';
import giturlparse from 'git-url-parse';
import { Mutation } from 'react-apollo';
import DeleteEnvironmentMutation from 'lib/mutation/DeleteEnvironment';
import DeleteConfirm from 'components/DeleteConfirm';
import Router from 'next/router';
import ActiveStandbyConfirm from 'components/ActiveStandbyConfirm';
import SwitchActiveStandbyMutation from 'lib/mutation/SwitchActiveStandby';
import {StyledEnvironmentDetails} from "./StyledEnvironment"
import useTranslation from "lib/useTranslation";

/**
 * Displays the environment information.
 */
const Environment = ({ environment }) => {
  const t = useTranslation();
  const gitUrlParsed = giturlparse(environment.project.gitUrl);
  const gitBranchLink = `${gitUrlParsed.resource}/${
    gitUrlParsed.full_name
    }/${environment.deployType === 'branch' ? `tree/${environment.name}` : `pull/${environment.name.replace(/pr-/i, '')}`}`;

  return (
    <StyledEnvironmentDetails className="details">
      <div className="field-wrapper environmentType">
        <div>
          <label>{t("environment.envType")}</label>
          <div className="field">
          {environment.environmentType}
          {environment.project.productionEnvironment && environment.project.standbyProductionEnvironment && environment.environmentType == 'production' && environment.project.productionEnvironment == environment.name &&
          (" (active)")}{environment.project.productionEnvironment && environment.project.standbyProductionEnvironment && environment.environmentType == 'production' && environment.project.standbyProductionEnvironment == environment.name && (" (standby)")}
          </div>
        </div>
      </div>
      <div className="field-wrapper deployType">
        <div>
          <label>{t("environment.deployType")}</label>
          <div className="field">{environment.deployType}</div>
        </div>
      </div>
      <div className="field-wrapper created">
        <div>
          <label>{t("environment.created")}</label>
          <div className="field">
            {moment
              .utc(environment.created)
              .local()
              .format('DD MMM YYYY, HH:mm:ss (Z)')}
          </div>
        </div>
      </div>
      <div className="field-wrapper updated">
        <div>
          <label>{t("environment.lastDeploy")}</label>
          <div className="field">
            {moment
              .utc(environment.updated)
              .local()
              .format('DD MMM YYYY, HH:mm:ss (Z)')}
          </div>
        </div>
      </div>
      <div className="field-wrapper source">
        <div>
          <label>{t("environment.source")}</label>
          <div className="field">
            <a
              className="hover-state"
              target="_blank"
              href={`https://${gitBranchLink}`}
            >
              {gitBranchLink}
            </a>
          </div>
        </div>
      </div>
      <div className="field-wrapper routes">
        {environment.project.productionEnvironment && environment.project.standbyProductionEnvironment && environment.environmentType == 'production' && environment.project.productionEnvironment == environment.name && (
        <div>
          <label>{t("environment.activeRoutes")}</label>
          <div className="field">
            {environment.project.productionRoutes
              ? environment.project.productionRoutes.split(',').map(route => (
                  <div key={route}>
                    <a className="hover-state" target="_blank" href={route}>
                      {route}
                    </a>
                  </div>
                ))
              : ''}
          </div>
        </div>)}
        {environment.project.productionEnvironment && environment.project.standbyProductionEnvironment && environment.environmentType == 'production' && environment.project.standbyProductionEnvironment == environment.name && (
        <div>
          <label>{t("environment.standbyRoutes")}</label>
          <div className="field">
            {environment.project.standbyRoutes
              ? environment.project.standbyRoutes.split(',').map(route => (
                  <div key={route}>
                    <a className="hover-state" target="_blank" href={route}>
                      {route}
                    </a>
                  </div>
                ))
              : ''}
          </div>
        </div>)}
        <div>
          <label>{t("environment.routes")}</label>
          <div className="field">
            {environment.routes
              ? environment.routes.split(',').map(route => (
                  <div key={route}>
                    <a className="hover-state" target="_blank" href={route}>
                      {route}
                    </a>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>
      {environment.project.productionEnvironment && environment.project.standbyProductionEnvironment && environment.environmentType == 'production' && environment.project.standbyProductionEnvironment == environment.name && (
      <Mutation mutation={SwitchActiveStandbyMutation}>
        {(switchActiveStandby, { loading, called, error, data }) => {
          const switchActiveBranch = () => {
            const input = {
              project:{
                name: environment.project.name
              }
            }

            switchActiveStandby({ variables: { input } });
            Router.push(`/projects/${environment.project.name}/${environment.openshiftProjectName}/tasks`)
          }

          if (!error && called && loading) {
            return <div>{t("environment.switching")}</div>;
          }

          return (
            <ActiveStandbyConfirm
              activeEnvironment={environment.project.productionEnvironment}
              standbyEnvironment={environment.project.standbyProductionEnvironment}
              onProceed={switchActiveBranch}
            />
          );
        }}
      </Mutation>
      )}
      <Mutation mutation={DeleteEnvironmentMutation}>
        {(deleteEnvironment, { loading, called, error, data }) => {
          if (error) {
            return <div>{error.message}</div>;
          }

          if (called) {
            return <div>{t("environment.deleteQueued")}</div>;
          }

          return (
            <DeleteConfirm
              deleteType="environment"
              deleteName={environment.name}
              onDelete={() =>
                deleteEnvironment({
                  variables: {
                    input: {
                      name: environment.name,
                      project: environment.project.name
                    }
                  }
                })
              }
            />
          );
        }}
      </Mutation>
    </StyledEnvironmentDetails>
  );
};

export default Environment;

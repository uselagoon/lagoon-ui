import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import giturlparse from 'git-url-parse';
import useTranslation from 'lib/useTranslation';
import moment from 'moment';
import * as R from 'ramda';

import { FieldWrapper, ProjectDetails } from './StyledProjectSidebar';

const Project = ({ project }) => {
  const t = useTranslation();
  const [copied, setCopied] = useState(false);
  const gitUrlParsed = giturlparse(project.gitUrl);
  const gitLink = `${gitUrlParsed.resource}/${gitUrlParsed.full_name}`;

  const environmentCount = R.countBy(R.prop('environmentType'))(project.environments);
  const developEnvironmentCount = R.propOr(0, 'development', environmentCount);
  const projectUsesDeployTargets = project.deployTargetConfigs.length > 0;

  return (
    <ProjectDetails className="details">
      <FieldWrapper className="field-wrapper created">
        <div>
          <label>{t('project.sidebar.created')}</label>
          <div className="field">{moment.utc(project.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}</div>
        </div>
      </FieldWrapper>
      <FieldWrapper className="field-wrapper origin">
        <div>
          <label>{t('project.sidebar.origin')}</label>
          <div className="field">
            <a className="hover-state" target="_blank" href={`https://${gitLink}`}>
              {gitLink}
            </a>
          </div>
        </div>
      </FieldWrapper>
      <FieldWrapper className="field-wrapper giturl">
        <div>
          <label>Git URL</label>
          <div className="copy-field">
            <div className="field">{project.gitUrl}</div>
            <span className="copied" style={copied ? { top: '-20px', opacity: '0' } : null}>
              {t('project.sidebar.copied')}
            </span>
            <CopyToClipboard
              text={project.gitUrl}
              onCopy={() => {
                setCopied(true);
                setTimeout(function () {
                  setCopied(false);
                }, 750);
              }}
            >
              <span className="copy" />
            </CopyToClipboard>
          </div>
        </div>
      </FieldWrapper>
      {!projectUsesDeployTargets && (
        <FieldWrapper className="field-wrapper branches">
          <div>
            <label>{t('project.sidebar.branchesEnabled')}</label>
            <div className="field">{project.branches}</div>
          </div>
        </FieldWrapper>
      )}
      {!projectUsesDeployTargets && (
        <FieldWrapper className="field-wrapper prs">
          <div>
            <label>{t('project.sidebar.prsEnabled')}</label>
            <div className="field">{project.pullrequests}</div>
          </div>
        </FieldWrapper>
      )}
      <FieldWrapper className="field-wrapper envlimit">
        <div>
          <label>{t('project.sidebar.devEnvsInuse')}</label>
          <div className="field">
            {developEnvironmentCount} {t('project.sidebar.of')}{' '}
            {R.defaultTo('unlimited', project.developmentEnvironmentsLimit)}
          </div>
        </div>
      </FieldWrapper>
      {projectUsesDeployTargets && (
        <FieldWrapper className="field-wrapper target">
          <div>
            <label>{t('project.sidebar.deployTargets')}</label>
            {project.deployTargetConfigs.map(depTarget => (
              <div key={depTarget.id}>
                <div>
                  <label className="field1">
                    {depTarget.deployTarget.friendlyName != null
                      ? depTarget.deployTarget.friendlyName
                      : depTarget.deployTarget.name}
                  </label>
                </div>
                <label className="field2">{t('project.sidebar.branchesEnabled')}</label>
                <div className="field2">{depTarget.branches}</div>
                <label className="field2">{t('project.sidebar.prsEnabled')}</label>
                <div className="field2">{depTarget.pullrequests}</div>
              </div>
            ))}
          </div>
        </FieldWrapper>
      )}
    </ProjectDetails>
  );
};

export default Project;

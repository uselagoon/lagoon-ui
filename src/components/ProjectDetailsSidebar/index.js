import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import OrganizationLink from 'components/link/Organizations/Organization';
import ProjectChildPageLink from 'components/link/ProjectChildPageLink';
import giturlparse from 'git-url-parse';
import moment from 'moment';
import * as R from 'ramda';

import { FieldWrapper, ProjectDetails } from './StyledProjectSidebar';

const ProjectDetailsSidebar = ({ project }) => {
  const [copied, setCopied] = useState(false);
  const environmentCount = R.countBy(R.prop('environmentType'))(project.environments);
  const developEnvironmentCount = R.propOr(0, 'development', environmentCount);
  const projectUsesDeployTargets = project.deployTargetConfigs.length > 0;

  let gitUrlParsed;

  try {
    gitUrlParsed = giturlparse(project.gitUrl);
  } catch {
    gitUrlParsed = null;
  }

  const gitLink = gitUrlParsed ? `${gitUrlParsed.resource}/${gitUrlParsed.full_name}` : '';

  return (
    <ProjectDetails className="details">
      <FieldWrapper className="field-wrapper created">
        <div>
          <label>Created</label>
          <div className="field" data-cy="created">
            {moment.utc(project.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}
          </div>
        </div>
      </FieldWrapper>
      {gitLink ? (
        <FieldWrapper className="field-wrapper origin">
          <div>
            <label>Origin</label>
            <div className="field">
              <a className="hover-state" data-cy="gitLink" target="_blank" href={`https://${gitLink}`}>
                {gitLink}
              </a>
            </div>
          </div>
        </FieldWrapper>
      ) : null}

      <FieldWrapper className="field-wrapper giturl">
        <div>
          <label>Git URL</label>
          <div className="copy-field">
            <div className="field">{project.gitUrl}</div>
            <span className="copied" style={copied ? { top: '-20px', opacity: '0' } : null}>
              Copied
            </span>
            <CopyToClipboard
              data-cy="copyButton"
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
            <label>Branches enabled</label>
            <div className="field" data-cy="branches">
              {project.branches}
            </div>
          </div>
        </FieldWrapper>
      )}
      {!projectUsesDeployTargets && (
        <FieldWrapper className="field-wrapper prs">
          <div>
            <label>Pull requests enabled</label>
            <div className="field" data-cy="pullRequests">
              {project.pullrequests}
            </div>
          </div>
        </FieldWrapper>
      )}
      <FieldWrapper className="field-wrapper envlimit">
        <div>
          <label>Development environments in use</label>
          <div className="field" data-cy="devEnvs">
            {developEnvironmentCount} of {R.defaultTo('unlimited', project.developmentEnvironmentsLimit)}
          </div>
        </div>
      </FieldWrapper>
      {projectUsesDeployTargets && (
        <FieldWrapper className="field-wrapper target">
          <div>
            <label>Deploy Targets</label>
            <div>
              <ProjectChildPageLink
                childPage={'deploy-targets'}
                projectSlug={project.name}
                className="deployLink deployTargets hover-state"
              >
                View
              </ProjectChildPageLink>
            </div>
          </div>
        </FieldWrapper>
      )}
      {project?.organization && (
        <FieldWrapper className="field-wrapper organization">
          <div>
            <label>Organization</label>
            <div>
              <OrganizationLink
                organizationSlug={project.organizationMetaData.name}
                organizationId={project.organizationMetaData.id}
                orgFriendlyName={project.organizationMetaData.friendlyName}
                className="deployLink deployTargets hover-state"
              >
                {project.organizationMetaData.friendlyName || project.organizationMetaData.name}
              </OrganizationLink>
            </div>
          </div>
        </FieldWrapper>
      )}
    </ProjectDetails>
  );
};

export default ProjectDetailsSidebar;

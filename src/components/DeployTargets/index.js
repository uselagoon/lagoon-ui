import React from "react";
import { DeployTargetWrapper } from "./StyledDeployTargets";

const DeployTargets = ({ project }) => {
  return (
    <DeployTargetWrapper>
      <h3>Deploy Targets</h3>
      <div className="header">
        <label className="dt-name">Deploy Target Name</label>
        <label className="dt-branch">Branches enabled</label>
        <label className="dt-pr">Pull reuqests enabled</label>
      </div>
      <div className="data-table">
        {project.deployTargetConfigs.map((depTarget) => (
          <div className="data-row" key={depTarget.id}>
            <div className="dt-name">
              {depTarget.deployTarget.friendlyName != null
                ? depTarget.deployTarget.friendlyName
                : depTarget.deployTarget.name}
            </div>
            <div className="dt-branch">{depTarget.branches}</div>
            <div
              className="dt-pr"
            >
              {depTarget.pullrequests}
            </div>
          </div>
        ))}
      </div>
    </DeployTargetWrapper>
  );
};

export default DeployTargets;

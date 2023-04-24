import React from "react";
import Skeleton from "react-loading-skeleton";
import {
  StyledProjectVariablesDetails,
  StyledProjectVariableTable,
} from "./StyledProjectVariables";
import Button from "react-bootstrap/Button";

const ProjectVariablesSkeleton = () => {
  const numberOfVariableFields = 3;

  const skeletonItem = (
    <div className="data-row">
      <div className="varName">
        <Skeleton width={"90%"} />
      </div>
      <div className="scope">
        <Skeleton width={"90%"} />
      </div>
      <div className="delete">
        <Skeleton width={"90%"} />
      </div>
    </div>
  );

  return (
    <StyledProjectVariablesDetails>
      <div className="header">
        <label>Project Variables</label>
        <div className="header-buttons">
          <Button>Add/Update</Button>
          <Button>Show values</Button>
        </div>
      </div>
      <StyledProjectVariableTable>
        <div className="table-header">
          <div className="name">
            <label>Name</label>
          </div>
          <div className="scope">
            <label>Scope</label>
          </div>
          <div className="delete">
            <label>Delete</label>
          </div>
        </div>
        <div className="data-table">
          {[...Array<undefined>(numberOfVariableFields)].map(
            () => skeletonItem
          )}
        </div>
      </StyledProjectVariableTable>
    </StyledProjectVariablesDetails>
  );
};

export default ProjectVariablesSkeleton;

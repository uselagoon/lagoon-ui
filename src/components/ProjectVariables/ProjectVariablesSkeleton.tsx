import React from "react";
import Skeleton from "react-loading-skeleton";
import { StyledProjectVariablesDetails } from "./StyledProjectVariables";
import AddEnvironmentVariable from "../AddVariable";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const ProjectVariablesSkeleton = () => {
  const numberOfVariableFields = 4;

  const skeletonItem = (
    <tr>
      <td className="name">
        <Skeleton width={"30%"} />
      </td>
      <td className="scope">
        <Skeleton width={"30%"} />
      </td>
      <td className="delete">
        <Skeleton width={"20%"} />
      </td>
    </tr>
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
      <div className="field-wrapper env-vars">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Project Variable Name</th>
              <th>Project Variable Scope</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {[...Array<undefined>(numberOfVariableFields)].map(
              () => skeletonItem
            )}
          </tbody>
        </Table>
      </div>
    </StyledProjectVariablesDetails>
  );
};

export default ProjectVariablesSkeleton;

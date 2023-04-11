import React from "react";
import Skeleton from "react-loading-skeleton";
import { StyledEnvironmentVariableDetails } from "./StyledEnvironmentVariables";
import AddEnvironmentVariable from "../AddVariable";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const EnvironmentVariablesSkeleton = () => {
  const numberOfVariableFields = 3

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
    <StyledEnvironmentVariableDetails>
      <AddEnvironmentVariable />
      <div className="header">
        <label>Environment Variables</label>
        <Button>Show values</Button>
      </div>
      <div className="field-wrapper env-vars">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Environment Variable Name</th>
              <th>Environment Variable Scope</th>
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
      <hr style={{ margin: "30px 0" }} />
      <div className="header">
        <label>Project Variables</label>
        <Button>Show values</Button>
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
    </StyledEnvironmentVariableDetails>
  );
};

export default EnvironmentVariablesSkeleton;

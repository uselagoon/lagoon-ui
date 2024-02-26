import React from 'react';
import Button from 'react-bootstrap/Button';
import Skeleton from 'react-loading-skeleton';

import { StyledEnvironmentVariableDetails, StyledProjectVariableTable } from './StyledEnvironmentVariables';

const EnvironmentVariablesSkeleton = () => {
  const numberOfVariableFields = 3;

  const skeletonItem = (
    <div className="data-row">
      <div className="varName">
        <Skeleton width={'90%'} />
      </div>
      <div className="scope">
        <Skeleton width={'90%'} />
      </div>
    </div>
  );

  const projectSkeletonItem = (
    <div className="data-row">
      <div className="varName">
        <Skeleton width={'90%'} />
      </div>
      <div className="scope">
        <Skeleton width={'90%'} />
      </div>
    </div>
  );

  return (
    <StyledEnvironmentVariableDetails>
      <div className="header">
        <label>Environment Variables</label>
        <div className="header-buttons">
          <Button>Add</Button>
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
        </div>
        <div className="data-table">{[...Array<undefined>(numberOfVariableFields)].map(() => skeletonItem)}</div>
      </StyledProjectVariableTable>
      <hr style={{ margin: '30px 0' }} />
      <div className="header">
        <label>Project Variables</label>
        <div className="header-buttons">
          <Button>Edit</Button>
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
        </div>
        <div className="data-table">{[...Array<undefined>(numberOfVariableFields)].map(() => projectSkeletonItem)}</div>
      </StyledProjectVariableTable>
    </StyledEnvironmentVariableDetails>
  );
};

export default EnvironmentVariablesSkeleton;

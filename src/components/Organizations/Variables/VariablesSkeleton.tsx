import React from 'react';
import Button from 'react-bootstrap/Button';
import Skeleton from 'react-loading-skeleton';

import { StyledVariableTable, StyledVariablesDetails } from './StyledVariables';

const VariablesSkeleton = () => {
  const numberOfVariableFields = 3;

  const skeletonItem = (idx: number) => (
    <div className="data-row" key={idx}>
      <div className="varName">
        <Skeleton width={'90%'} />
      </div>
      <div className="scope">
        <Skeleton width={'90%'} />
      </div>
    </div>
  );

  return (
    <StyledVariablesDetails>
      <div className="header">
        <label>Organization Variables</label>
        <div className="header-buttons">
          <Button>Add</Button>
          <Button>Show values</Button>
        </div>
      </div>
      <StyledVariableTable>
        <div className="table-header">
          <div className="name">
            <label>Name</label>
          </div>
          <div className="scope">
            <label>Scope</label>
          </div>
        </div>
        <div className="data-table">
          {[...Array<undefined>(numberOfVariableFields)].map((_, idx) => skeletonItem(idx))}
        </div>
      </StyledVariableTable>
    </StyledVariablesDetails>
  );
};

export default VariablesSkeleton;

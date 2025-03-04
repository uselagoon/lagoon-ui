import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledTasks, TasksTable } from './StyledTasks';

const TasksSkeleton = () => {
  const numberOfItems = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  const itemRender = (idx: number) => (
    <div className="taskRow" key={idx}>
      <div className="data-row">
        <div className="name">
          <Skeleton />
        </div>
        <div className="started">
          <Skeleton />
        </div>
        <div className="service">
          <Skeleton />
        </div>
        <div className="status">
          <Skeleton />
        </div>
        <div className="duration">
          <Skeleton width={'80%'} />
        </div>
      </div>
      <div className="cancel-button">
        <Skeleton />
      </div>
    </div>
  );

  return (
    <StyledTasks className="tasks">
      <div className="header">
        <label>Name</label>
        <label>Created</label>
        <label className="service">Service</label>
        <label className="status">Status</label>
        <label>Duration</label>
      </div>
      <TasksTable className="data-table">
        {[...Array<undefined>(numberOfItems)].map((_, idx) => itemRender(idx))}
      </TasksTable>
    </StyledTasks>
  );
};

export default TasksSkeleton;

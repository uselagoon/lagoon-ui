import React from "react";
import Skeleton from "react-loading-skeleton";
import { StyledTasks, TasksTable } from "./StyledTasks";

const TasksSkeleton = () => {
  const numberOfItems =
    typeof window !== "undefined"
      ? Math.floor((window.innerHeight * 8) / 10 / 65)
      : 10;

  const itemRender = (
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
        <span>
          <Skeleton />
        </span>
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
      </div>
      <TasksTable className="data-table">
        {[...Array<undefined>(numberOfItems)].map(() => itemRender)}
      </TasksTable>
    </StyledTasks>
  );
};

export default TasksSkeleton;

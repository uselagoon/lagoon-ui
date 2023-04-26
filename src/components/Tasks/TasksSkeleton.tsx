import React from 'react';
import Skeleton from 'react-loading-skeleton';

import useTranslation from 'lib/useTranslation';

import { StyledTasks, TasksTable } from './StyledTasks';

const TasksSkeleton = () => {
  const t = useTranslation();
  const numberOfItems = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

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
        <label>{t('tasks.name')}</label>
        <label>{t('tasks.created')}</label>
        <label className="service">{t('tasks.service')}</label>
        <label className="status">{t('tasks.status')}</label>
      </div>
      <TasksTable className="data-table">{[...Array<undefined>(numberOfItems)].map(() => itemRender)}</TasksTable>
    </StyledTasks>
  );
};

export default TasksSkeleton;

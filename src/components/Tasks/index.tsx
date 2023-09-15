import React, { FC } from 'react';

import CancelTask from 'components/CancelTask';
import TaskLink from 'components/link/Task';
import moment from 'moment';

import { StyledTasks, TasksTable } from './StyledTasks';

interface TasksProps {
  tasks: {
    id:string;
    taskName: string;
    name: string;
    adminOnlyView: boolean;
    created: string;
    service: string;
    status: string;
  }[];
  environmentSlug: string;
  environmentId: number;
  projectSlug: string;
  projectId: number;
}

/**
 * Displays an environment's list of tasks.
 */
const Tasks: FC<TasksProps> = ({ tasks, environmentSlug, environmentId, projectSlug, projectId }) => (
  <StyledTasks className="tasks">
    <div className="header">
      <label>Name</label>
      <label>Created</label>
      <label className="service">Service</label>
      <label className="status">Status</label>
    </div>
    <TasksTable className="data-table">
      {!tasks.length && <div className="data-none">No Tasks</div>}
      {tasks.map(task => (
        <div className='taskRow'>
          <TaskLink
            taskSlug={task.taskName}
            environmentSlug={environmentSlug}
            projectSlug={projectSlug}
            key={task.taskName}
          >
            <div className="data-row" data-task={task.taskName}>
              <div className="name">
                {task.name}
                {task.adminOnlyView && <label className="bulk-label">admin</label>}
              </div>
              <div className="started">{moment.utc(task.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}</div>
              <div className="service">{task.service}</div>
              <div className={`status ${task.status}`}>
                <span>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span>
              </div>
            </div>
          </TaskLink>
          {['new', 'pending', 'queued', 'running'].includes(task.status) && (
            <CancelTask
              task={task}
              afterText="Cancelled"
              beforeText="Cancel"
              environmentId={environmentId}
              projectId={projectId}
            />
          )}
        </div>
      ))}
    </TasksTable>
  </StyledTasks>
);

export default Tasks;

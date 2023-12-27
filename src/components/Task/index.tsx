import React, { FC } from 'react';

import CancelTask from 'components/CancelTask';
import LogViewer from 'components/LogViewer';
import moment from 'moment';

import { StyledTask } from './StyledTask';

type TaskFile = {
  id: string;
  download: string;
  filename: string;
};
interface TaskProps {
  task: {
    id: string;
    created: string;
    service: string;
    status: string;
    files: TaskFile[];
    logs: string;
    taskName: string;
  };
  projectId: number;
  environmentId: number;
}

/**
 * Displays information about an environment task.
 */
const Task: FC<TaskProps> = ({ task, projectId, environmentId }) => {
  if (!task) return <p style={{ textAlign: 'center' }}>Task not found</p>;
  return (
    <StyledTask className="task">
      <div className="details">
        <div className="field-wrapper created">
          <div>
            <label>Created</label>
            <div className="field">{moment.utc(task.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}</div>
          </div>
        </div>
        <div className="field-wrapper service">
          <div>
            <label>Service</label>
            <div className="field">{task.service}</div>
          </div>
        </div>
        <div className={`field-wrapper status ${task.status}`}>
          <div>
            <label>Status</label>
            <div className="field">{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</div>
          </div>

          {['new', 'pending', 'queued', 'running'].includes(task.status) && (
            <div className="cancel-button">
              <CancelTask
                task={task}
                afterText="Cancelled"
                beforeText="Cancel"
                environmentId={environmentId}
                projectId={projectId}
              />
            </div>
          )}
        </div>

        {task.files.length > 0 && (
          <div className="field-wrapper files">
            <div>
              <label>Files</label>
              <ul className="field">
                {task.files.map(file => (
                  <li key={file.id}>
                    <a href={file.download}>{file.filename}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <LogViewer logs={task.logs} status={task.status} changeState={null} checkedParseState={true} forceLastSectionOpen={true} />
    </StyledTask>
  );
};

export default Task;

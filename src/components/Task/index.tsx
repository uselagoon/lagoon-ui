import React, { FC } from 'react';

import CancelTask from 'components/CancelTask';
import LogViewer from 'components/LogViewer';
import { getProcessDuration, isValidUrl } from 'lib/util';
import moment from 'moment';
import { FieldWrapper } from 'styles/commonStyles';

import { CancelRow, StyledTask } from './StyledTask';

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
    started: string;
    completed: string;
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
        <FieldWrapper className="created">
          <div>
            <label>Created</label>
            <div className="field">{moment.utc(task.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}</div>
          </div>
        </FieldWrapper>
        <FieldWrapper className="service">
          <div>
            <label>Service</label>
            <div className="field">{task.service}</div>
          </div>
        </FieldWrapper>

        <FieldWrapper className={`status ${task.status}`}>
          <div>
            <label>Status</label>
            <div className="field">{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</div>
          </div>
        </FieldWrapper>

        <FieldWrapper className="duration">
          <div>
            <label>Duration</label>
            <div className="field">{getProcessDuration(task)}</div>
          </div>
        </FieldWrapper>

        {task.files.length > 0 && (
          <FieldWrapper className="files">
            <div>
              <label>Files</label>
              <ul className="field">
                {task.files.map(file => (
                  <li key={file.id}>
                    <a href={file.download}>{file.filename}</a>
                  </li>
                ))}

                {task.files.map(file => {
                  const { id, filename, download } = file;
                  const downloadURL = isValidUrl(download) ? download : undefined;
                  return (
                    <li key={id}>
                      <a href={downloadURL}>{filename}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FieldWrapper>
        )}

        <CancelRow>
          {['new', 'pending', 'queued', 'running'].includes(task.status) && (
            <CancelTask
              task={task}
              afterText="Cancelled"
              beforeText="Cancel"
              environmentId={environmentId}
              projectId={projectId}
            />
          )}
        </CancelRow>
      </div>

      <LogViewer
        logs={task.logs}
        status={task.status}
        changeState={null}
        checkedParseState={true}
        forceLastSectionOpen={true}
        logsTarget={'tasks'}
      />
    </StyledTask>
  );
};

export default Task;

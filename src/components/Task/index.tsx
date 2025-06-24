import React, { FC, useState } from 'react';

import { useLazyQuery } from '@apollo/react-hooks';
import Button from 'components/Button';
import CancelTask from 'components/CancelTask';
import LogViewer from 'components/LogViewer';
import gql from 'graphql-tag';
import { getProcessDuration, isValidUrl } from 'lib/util';
import moment from 'moment';
import { FieldWrapper } from 'styles/commonStyles';

import { CancelRow, FileDownload, StyledTask } from './StyledTask';

const getTaskFilesDownload = gql`
  query getTask($taskName: String!) {
    taskByTaskName(taskName: $taskName) {
      id
      files {
        id
        filename
        download
      }
    }
  }
`;

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

interface GetTaskFilesDownloadData {
  taskByTaskName: {
    files: TaskFile[];
  };
}

/**
 * Displays information about an environment task.
 */
const Task: FC<TaskProps> = ({ task, projectId, environmentId }) => {
  const [fileDownloads, setFileDownloads] = useState<Record<string, string>>({});
  const [targetFileId, setTargetFileId] = useState<string | null>(null);
  const [getFilesDownload, { loading, error }] = useLazyQuery<GetTaskFilesDownloadData>(getTaskFilesDownload, {
    variables: {
      taskName: task.taskName,
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      if (!targetFileId || !data) {
        setTargetFileId(null);
        return;
      }
      const allFiles = data.taskByTaskName?.files;
      const targetFile = allFiles?.find(file => file.id === targetFileId);

      if (targetFile?.download && isValidUrl(targetFile.download)) {
        const { id, download } = targetFile;
        setFileDownloads(prevUrls => ({
          ...prevUrls,
          [id]: download,
        }));
        window.open(download, '_blank', 'noopener,noreferrer');
      } else {
        console.error(`Error fetching file download: ${targetFileId}`);
      }
      setTargetFileId(null);
    },
    onError: () => {
      console.error(error);
      setTargetFileId(null);
    },
  });

  const handleDownload = (fileToDownload: TaskFile) => {
    if (loading) return;
    const fileDownload = fileDownloads[fileToDownload.id];

    if (fileDownload) {
      window.open(fileDownload, '_blank', 'noopener,noreferrer');
    } else {
      setTargetFileId(fileToDownload.id);
      getFilesDownload();
    }
  };

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
                {task.files.map(file => {
                  const { id, filename } = file;
                  return (
                    <FileDownload key={id}>
                      <li key={id}>
                        <Button
                          // @ts-ignore
                          action={() => handleDownload(file)}
                        >
                          {filename}
                        </Button>
                      </li>
                    </FileDownload>
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

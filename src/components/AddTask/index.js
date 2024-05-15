import React from 'react';
import ReactSelect from 'react-select';

import { NewTaskWrapper, StyledNewTask } from './StyledAddTask';
import Completed from './components/Completed';
import DrushArchiveDump from './components/DrushArchiveDump';
import DrushCacheClear from './components/DrushCacheClear';
import DrushCron from './components/DrushCron';
import DrushRsyncFiles from './components/DrushRsyncFiles';
import DrushSqlDump from './components/DrushSqlDump';
import DrushSqlSync from './components/DrushSqlSync';
import DrushUserLogin from './components/DrushUserLogin';
import Empty from './components/Empty';
import Error from './components/Error';
import InvokeRegisteredTask from './components/InvokeRegisteredTask';
import withLogic from './logic';

/**
 * Perform a task on the CLI environment.
 */
const AddTask = ({
  pageEnvironment,
  projectEnvironments,
  selectedTask,
  setSelectedTask,
  onCompleted,
  onError,
  errMessage,
  options,
  onNewTask,
}) => {
  const newTaskComponents = {
    DrushArchiveDump,
    DrushSqlDump,
    DrushCacheClear,
    DrushCron,
    DrushRsyncFiles,
    DrushSqlSync,
    DrushUserLogin,
    Empty,
    Completed,
    Error,
    InvokeRegisteredTask,
  };

  const NewTask = selectedTask
    ? selectedTask.value
      ? newTaskComponents[selectedTask.value]
      : newTaskComponents[selectedTask]
    : newTaskComponents[Empty];

  return (
    <React.Fragment>
      <NewTaskWrapper>
        <StyledNewTask>
          <div className="selectTask" data-cy="select-task">
            <ReactSelect
              aria-label="Task"
              placeholder="Select a task..."
              name="task"
              value={options.find(o => o.value === selectedTask)}
              onChange={selectedOption => setSelectedTask(selectedOption)}
              options={options}
              required
            />
          </div>
          {selectedTask && (
            <div className="taskForm" data-cy="task-form">
              <NewTask
                pageEnvironment={pageEnvironment}
                projectEnvironments={projectEnvironments}
                selectedTask={selectedTask}
                onCompleted={onCompleted}
                onError={e => onError(e.message)}
                errMessage={errMessage}
                onNewTask={onNewTask}
              />
            </div>
          )}
        </StyledNewTask>
      </NewTaskWrapper>
    </React.Fragment>
  );
};

export default withLogic(AddTask);

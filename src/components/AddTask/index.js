import React from "react";
import ReactSelect from "react-select";
import withLogic from "./logic";
import DrushArchiveDump from "./components/DrushArchiveDump";
import DrushSqlDump from "./components/DrushSqlDump";
import DrushCacheClear from "./components/DrushCacheClear";
import DrushCron from "./components/DrushCron";
import DrushRsyncFiles from "./components/DrushRsyncFiles";
import DrushSqlSync from "./components/DrushSqlSync";
import DrushUserLogin from "./components/DrushUserLogin";
import Empty from "./components/Empty";
import Completed from "./components/Completed";
import Error from "./components/Error";
import InvokeRegisteredTask from "./components/InvokeRegisteredTask";
import { NewTaskWrapper, StyledNewTask } from "./StyledAddTask";

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
  options,
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
          <div className="selectTask">
            <ReactSelect
              aria-label="Task"
              placeholder="Select a task..."
              name="task"
              value={options.find((o) => o.value === selectedTask)}
              onChange={(selectedOption) => setSelectedTask(selectedOption)}
              options={options}
              required
            />
          </div>
          {selectedTask && (
            <div className="taskForm">
              <NewTask
                pageEnvironment={pageEnvironment}
                projectEnvironments={projectEnvironments}
                selectedTask={selectedTask}
                onCompleted={onCompleted}
                onError={onError}
              />
            </div>
          )}
        </StyledNewTask>
      </NewTaskWrapper>
    </React.Fragment>
  );
};

export default withLogic(AddTask);

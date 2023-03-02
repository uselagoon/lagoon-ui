import React, { FC } from "react";
import ReactSelect, { SingleValue } from "react-select";
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

type GenericObject = Record<string, string>;
type OptionValue = {
  label: string;
  value: string;
};

type Environment = {
  id: string;
  project: {
    name: string;
  };
  openshiftProjectName: string;
  tasks: Array<GenericObject>;
};

interface AddTaskProps {
  pageEnvironment: Environment;
  projectEnvironments: string[];
  selectedTask: {
    id: string;
    value: string;
    arguments: {
      name: string;
      displayName: string;
    }[];
    confirmationText: string;
  };
  setSelectedTask: (task: SingleValue<OptionValue>) => void;
  onCompleted: (cb: () => void) => void;
  onError: (cb: () => void) => void;
  options: OptionValue[];
}

/**
 * Perform a task on the CLI environment.
 */

const AddTask: FC<AddTaskProps> = ({
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
      : // @ts-ignore - needs clarification
        newTaskComponents[selectedTask]
    : Empty;

  return (
    <React.Fragment>
      <NewTaskWrapper>
        <StyledNewTask>
          <div className="selectTask">
            <ReactSelect
              aria-label="Task"
              placeholder="Select a task..."
              name="task"
              value={options.find((o) => o.value === selectedTask.value)}
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

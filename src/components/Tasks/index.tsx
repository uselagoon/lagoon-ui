import React, { FC } from "react";
import moment from "moment";
import TaskLink from "components/link/Task";
import { StyledTasks, TasksTable } from "./StyledTasks";
import useTranslation from "lib/useTranslation";

interface TasksProps {
  tasks: {
    taskName: string;
    name: string;
    adminOnlyView: boolean;
    created: string;
    service: string;
    status: string;
  }[];
  environmentSlug: string;
  projectSlug: string;
}

/**
 * Displays an environment's list of tasks.
 */
const Tasks: FC<TasksProps> = ({ tasks, environmentSlug, projectSlug }) => {
  const t = useTranslation();

  return (
    <StyledTasks className="tasks">
      <div className="header">
        <label>{t("tasks.name")}</label>
        <label>{t("tasks.created")}</label>
        <label className="service">{t("tasks.service")}</label>
        <label className="status">{t("tasks.status")}</label>
      </div>
      <TasksTable className="data-table">
        {!tasks.length && <div className="data-none">{t("tasks.noTasks")}</div>}
        {tasks.map((task) => (
          <TaskLink
            taskSlug={task.taskName}
            environmentSlug={environmentSlug}
            projectSlug={projectSlug}
            key={task.taskName}
          >
            <div className="data-row" data-task={task.taskName}>
              <div className="name">
                {task.name}
                {task.adminOnlyView && (
                  <label className="bulk-label">{t("tasks.admin")}</label>
                )}
              </div>
              <div className="started">
                {moment
                  .utc(task.created)
                  .local()
                  .format("DD MMM YYYY, HH:mm:ss (Z)")}
              </div>
              <div className="service">{task.service}</div>
              <div className={`status ${task.status}`}>
                <span>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>
            </div>
          </TaskLink>
        ))}
      </TasksTable>
    </StyledTasks>
  );
};

export default Tasks;

import React, { FC } from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';
import { getLinkData } from 'components/link/Task';

interface TaskBreadcrumbProps {
  taskName: string;
  taskSlug: string;
  environmentSlug: string;
  projectSlug: string;
}

const TaskBreadcrumb: FC<TaskBreadcrumbProps> = ({ taskName, taskSlug, environmentSlug, projectSlug }) => {
  const linkData = getLinkData(taskSlug, environmentSlug, projectSlug);

  return <Breadcrumb header="Task" title={taskName} {...linkData} />;
};

export default TaskBreadcrumb;

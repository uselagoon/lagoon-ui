import Link from 'next/link';

export const getLinkData = (taskId, environmentSlug, projectSlug) => ({
  urlObject: {
    pathname: '/projects/[projectSlug]/[environmentSlug]/tasks/[taskId]',
    query: {
      openshiftProjectName: environmentSlug,
      taskId: taskId
    }
  },
  asPath: `/projects/${projectSlug}/${environmentSlug}/tasks/${taskId}`
});

/**
 * Links to the task page given the task ID, project name and the openshift project name.
 */
const TaskLink = ({
  taskId,
  environmentSlug,
  projectSlug,
  children,
  className = null,
  prefetch = false
}) => {
  const linkData = getLinkData(taskId, environmentSlug, projectSlug);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default TaskLink;

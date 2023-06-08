import Link from 'next/link';

export const getLinkData = (environmentSlug, projectSlug) => ({
  urlObject: {
    pathname: '/tasks',
    query: { openshiftProjectName: environmentSlug },
  },
  asPath: `/projects/${projectSlug}/${environmentSlug}/tasks`,
});

/**
 * Links to the tasks page given the project name and the openshift project name.
 * @component
 * @param {any} children
 * @param {string} environmentSlug
 * @param {string} projectSlug
 * @ts-ignore
 */

const TasksLink = ({ environmentSlug, projectSlug, children, className = '', prefetch = false }) => {
  const linkData = getLinkData(environmentSlug, projectSlug);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default TasksLink;

import Link from 'next/link';

export const getLinkData = (environmentSlug, projectSlug) => ({
  urlObject: {
    pathname: '/environment',
    query: { openshiftProjectName: environmentSlug },
  },
  asPath: `/projects/${projectSlug}/${environmentSlug}`,
});

/**
 * Links to the environment page given the project name and the openshift project name.
 */
const EnvironmentLink = ({ environmentSlug, projectSlug, children, className = '', prefetch = false }) => {
  const linkData = getLinkData(environmentSlug, projectSlug);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch} className={className}>
      {children}
    </Link>
  );
};

export default EnvironmentLink;

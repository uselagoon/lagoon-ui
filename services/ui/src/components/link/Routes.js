import Link from 'next/link';

export const getLinkData = (environmentSlug, projectSlug) => ({
  urlObject: {
    pathname: '/projects/[projectSlug]/[environmentSlug]/routes',
    query: { openshiftProjectName: environmentSlug }
  },
  asPath: `/projects/${projectSlug}/${environmentSlug}/routes`
});

/**
 * Links to the primary routes page given the project name and the openshift project name.
 */
const RoutesLink = ({
  environmentSlug,
  projectSlug,
  children,
  className = null,
  prefetch = false
}) => {
  const linkData = getLinkData(environmentSlug, projectSlug);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default RoutesLink;

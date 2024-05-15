import Link from 'next/link';

export const getLinkData = (environmentSlug, projectSlug) => ({
  urlObject: {
    pathname: '/backups',
    query: { openshiftProjectName: environmentSlug },
  },
  asPath: `/projects/${projectSlug}/${environmentSlug}/backups`,
});

/**
 * Links to the backups page given the project name and the openshift project name.
 */
const BackupsLink = ({ environmentSlug, projectSlug, children, className = '', prefetch = false }) => {
  const linkData = getLinkData(environmentSlug, projectSlug);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch} className={className}>
      {children}
    </Link>
  );
};

export default BackupsLink;

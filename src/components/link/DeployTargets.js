import Link from 'next/link';

export const getLinkData = projectSlug => ({
  urlObject: {
    pathname: '/deploy-targets',
    query: { projectName: projectSlug },
  },
  asPath: `/projects/${projectSlug}/deploy-targets`,
});

const DeployTargetsLink = ({ projectSlug, children, className = '', prefetch = false }) => {
  const linkData = getLinkData(projectSlug);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default DeployTargetsLink;

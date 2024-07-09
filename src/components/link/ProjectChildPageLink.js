import Link from 'next/link';

export const getLinkData = (childPage, projectSlug) => ({
  urlObject: {
    pathname: `/${childPage}`,
    query: { projectName: projectSlug },
  },
  asPath: `/projects/${projectSlug}/${childPage}`,
});

const ProjectChildPageLink = ({ childPage, projectSlug, children, className = '', prefetch = false }) => {
  const linkData = getLinkData(childPage, projectSlug);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch} className={className}>
      {children}
    </Link>
  );
};

export default ProjectChildPageLink;

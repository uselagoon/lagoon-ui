import Link from 'next/link';

export const getLinkData = (childPage, projectSlug) => ({
  urlObject: {
    pathname: "/project-variables",
    query: { projectName: projectSlug }
  },
  asPath: `/projects/${projectSlug}/${projectSlug}-${childPage}`
});

const ProjectChildPageLink = ({
  childPage,
  projectSlug,
  children,
  className = null,
  prefetch = false
}) => {
  const linkData = getLinkData(childPage, projectSlug);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default ProjectChildPageLink;

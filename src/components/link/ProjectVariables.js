import Link from "next/link";

export const getLinkData = (projectSlug) => ({
  urlObject: {
    pathname: "/project-variables",
    query: { projectName: projectSlug },
  },
  asPath: `/projects/${projectSlug}/project-variables`,
});

const ProjectVariablesLink = ({
  projectSlug,
  children,
  className = null,
  prefetch = false,
}) => {
  const linkData = getLinkData(projectSlug);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default ProjectVariablesLink;

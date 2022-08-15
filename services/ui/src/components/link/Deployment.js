import Link from 'next/link';

export const getLinkData = (deploymentName, environmentSlug, projectSlug) => ({
  urlObject: {
    pathname: '/projects/[projectSlug]/[environmentSlug]/deployments/[deploymentName]',
    query: {
      openshiftProjectName: environmentSlug,
      deploymentName: deploymentName
    }
  },
  asPath: `/projects/${projectSlug}/${environmentSlug}/deployments/${deploymentName}`
});

/**
 * Links to the deployment page given the deployment name, the project name and the openshift project name.
 */
const DeploymentLink = ({
  deploymentName,
  environmentSlug,
  projectSlug,
  children,
  className = null,
  prefetch = false
}) => {
  const linkData = getLinkData(deploymentName, environmentSlug, projectSlug);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default DeploymentLink;

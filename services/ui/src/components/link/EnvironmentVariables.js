import Link from 'next/link';

export const getLinkData = () => ({
  urlObject: {
    pathname: '/add/envvar'
  },
  asPath: `/add/envvar`
});

/**
 * Links to the /add/envvar page
 */
const EnvVarLink = ({
  children,
  className = null,
  prefetch = false
}) => {
  const linkData = getLinkData();

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default EnvVarLink;

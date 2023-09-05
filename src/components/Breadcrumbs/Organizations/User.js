import React from 'react';
import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';

const getLinkData = (userSlug, organizationSlug, organizationName) => ({
    urlObject: {
      pathname: '/organizations/user',
      query: { userSlug, organizationSlug: organizationSlug, organizationName: organizationName },
    },
    asPath: `/organizations/${organizationSlug}/users/${userSlug}`,
  });

const UserBreadcrumb = ({ userSlug, organizationSlug, organizationName, loading }) => {
  const linkData = getLinkData(userSlug, organizationSlug, organizationName);

  return (
    <Breadcrumb
      header="User"
      title={userSlug}
      loading={loading}
      {... linkData}
    />
  );
};

export default UserBreadcrumb;

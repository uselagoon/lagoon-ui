import React from 'react';

import Breadcrumb from 'components/Breadcrumbs/Breadcrumb';

const getLinkData = (userSlug: string, organizationSlug: string, organizationId: number) => ({
  urlObject: {
    pathname: '/organizations/user',
    query: { userSlug, organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/users/${userSlug}`,
});

interface Props {
  userSlug: string;
  organizationSlug: string;
  organizationId: number;
  loading: boolean;
}

const UserBreadcrumb = ({ userSlug, organizationSlug, organizationId, loading }: Props) => {
  const linkData = getLinkData(userSlug, organizationSlug, organizationId);

  return <Breadcrumb header="User" title={userSlug} loading={loading} {...linkData} />;
};

export default UserBreadcrumb;

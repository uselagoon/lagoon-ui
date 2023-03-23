import React, { FC } from "react";
import Breadcrumb from "components/Breadcrumbs/Breadcrumb";

interface EnvironmentBreadcrumbProps {
  header: string;
  problemSlug: string;
  environmentSlug: string;
  projectSlug: string;
}

const EnvironmentBreadcrumb: FC<EnvironmentBreadcrumbProps> = ({
  header,
  problemSlug,
  environmentSlug,
  projectSlug,
}) => {
  const linkData = {
    urlObject: {
      pathname: "/problems",
      query: { openshiftProjectName: environmentSlug },
    },
    asPath: `/projects/${projectSlug}/${environmentSlug}/problems`,
  };

  return <Breadcrumb header={header} title={problemSlug} {...linkData} />;
};

export default EnvironmentBreadcrumb;

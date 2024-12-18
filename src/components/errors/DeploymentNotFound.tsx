import React from 'react';

import ErrorPage from './_ErrorPage';

export default ({ deploymentName }: { deploymentName: string }) => (
  <ErrorPage statusCode={404} errorMessage={`Deployment "${deploymentName}" not found`} />
);

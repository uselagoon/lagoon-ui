import React from 'react';

import ErrorPage from './_ErrorPage';

export default ({ openshiftProjectName }: { openshiftProjectName: string }) => (
  <ErrorPage statusCode={404} errorMessage={`Environment "${openshiftProjectName}" not found`} />
);

import React from 'react';

import ErrorPage from './_ErrorPage';

export default ({ projectName }: { projectName: string }) => (
  <ErrorPage statusCode={404} errorMessage={`Project "${projectName}" not found`} />
);

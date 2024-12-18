import React from 'react';

import ErrorPage from './_ErrorPage';

export default ({ projectName }: { projectName: string }) => (
  <ErrorPage statusCode={404} errorMessage={`Organization Project "${projectName}" not found`} />
);

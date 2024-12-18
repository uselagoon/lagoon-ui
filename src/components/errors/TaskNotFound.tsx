import React from 'react';

import ErrorPage from './_ErrorPage';

export default ({ taskName }: { taskName: string }) => (
  <ErrorPage statusCode={404} errorMessage={`Task "${taskName}" not found`} />
);

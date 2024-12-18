import React from 'react';

import ErrorPage from './_ErrorPage';

export default ({ orgName }: { orgName: string }) => (
  <ErrorPage statusCode={404} errorMessage={`Organization "${orgName}" not found`} />
);

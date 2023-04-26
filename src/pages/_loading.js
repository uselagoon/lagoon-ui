import React from 'react';

import StatusLayout, { StatusLayoutNoHeader } from 'layouts/StatusLayout';

/**
 * Displays the loading page.
 */
const LoadingPage = () => (
  <StatusLayout>
    <h2>Loading ...</h2>
  </StatusLayout>
);

export const LoadingPageNoHeader = () => (
  <StatusLayoutNoHeader>
    <h2>Loading ...</h2>
  </StatusLayoutNoHeader>
);

export default LoadingPage;

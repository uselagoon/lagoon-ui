import React from 'react';

import LogViewer from './index';

export default {
  component: LogViewer,
  title: 'Components/LogViewer',
};

//@ts-ignore
export const Default = () => <LogViewer logs={'Taskem logem ipsum.'} />;
//@ts-ignore
export const NoLogs = () => <LogViewer />;

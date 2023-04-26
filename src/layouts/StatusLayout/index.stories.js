import React from 'react';

import Lipsum from 'storybook/components/Lipsum';

import StatusLayout from './index';

export default {
  component: StatusLayout,
  title: 'Components/Layouts/Status Layout',
};

export const Default = () => (
  <StatusLayout>
    <Lipsum />
  </StatusLayout>
);

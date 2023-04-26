import React from 'react';

import Lipsum from 'storybook/components/Lipsum';

import MainLayout from './index';

export default {
  component: MainLayout,
  title: 'Components/Layouts/Main Layout',
};

export const Default = () => (
  <MainLayout>
    <Lipsum />
  </MainLayout>
);

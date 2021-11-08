import React from 'react';
import MainLayout from './index';
import Lipsum from 'storybook/components/Lipsum';

export default {
  component: MainLayout,
  title: 'Components/Layouts/MainLayout',
}

export const Default = () => (
  <MainLayout>
    <Lipsum />
  </MainLayout>
);

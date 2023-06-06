import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import StatusLayout, { StatusLayoutNoHeader } from './index';

const meta: Meta<typeof StatusLayout> = {
  component: StatusLayout,
  tags: ['autodocs'],
  title: 'Layouts/Status Layout',
  parameters: {
    controls: { hideNoControlsWarning: true },
    options: {
      showPanel: false,
    },
  },
};

type Story = StoryObj<typeof StatusLayout>;

export const Default: Story = {
  render: () => (
    <StatusLayout>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi possimus, quidem recusandae dolores rem illum
      voluptatum! Libero doloribus exercitationem minima animi vero est cupiditate labore voluptate fugit! Numquam omnis
      rem ipsum, tempore fugit minus voluptatem, veniam qui mollitia, sequi sunt incidunt voluptatum explicabo. Atque
      animi possimus quibusdam, asperiores voluptate commodi.
    </StatusLayout>
  ),
};

export const NoHeaderOrFooter: Story = {
  render: () => (
    <StatusLayoutNoHeader>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi possimus, quidem recusandae dolores rem illum
      voluptatum! Libero doloribus exercitationem minima animi vero est cupiditate labore voluptate fugit! Numquam omnis
      rem ipsum, tempore fugit minus voluptatem, veniam qui mollitia, sequi sunt incidunt voluptatum explicabo. Atque
      animi possimus quibusdam, asperiores voluptate commodi.
    </StatusLayoutNoHeader>
  ),
};

export default meta;

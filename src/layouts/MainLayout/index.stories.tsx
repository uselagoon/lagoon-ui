import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import MainLayout from './index';

const meta: Meta<typeof MainLayout> = {
  component: MainLayout,
  tags: ['autodocs'],
  title: 'Layouts/Main Layout',
  parameters: {
    controls: { hideNoControlsWarning: true },
    options: {
      showPanel: false,
    },
  },
};

type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  render: () => (
    <MainLayout>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga corrupti, eligendi perferendis incidunt vero dicta
      odit aspernatur repellat vel mollitia, dignissimos id officia quisquam magni nihil neque a voluptatem impedit!
      Quae et sed molestiae aliquam, suscipit nulla voluptas necessitatibus. Consequatur, fuga! Quas corrupti et
      distinctio iure magni ex itaque omnis.
    </MainLayout>
  ),
};
export default meta;

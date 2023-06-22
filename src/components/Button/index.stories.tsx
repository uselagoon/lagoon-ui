import React from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import Button from './index';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
};

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => <Button action={action('button-click')}>Default Button</Button>,
};

export const Disabled: Story = {
  render: () => (
    <Button action={action('button-click')} disabled>
      Disabled Button
    </Button>
  ),
};

export const ButtonLink: Story = {
  render: () => (
    <Button
      action={() => {
        return;
      }}
    >
      Button Link
    </Button>
  ),
};

export const DisabledButtonLink: Story = {
  render: () => (
    <Button
      action={() => {
        return;
      }}
      disabled
    >
      Button Link
    </Button>
  ),
};

export default meta;

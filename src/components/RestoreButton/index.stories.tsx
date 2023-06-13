import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import withButtonOverrides from '../../../.storybook/decorators/withButtonOverrides';
import { generateBackup } from '../../../.storybook/mocks/mocks';
import RestoreButton from './index';

const backup = generateBackup();

/**
 * Backup download button
 */
const meta: Meta<typeof RestoreButton> = {
  title: 'Components/RestoreButton',
  component: RestoreButton,
  tags: ['autodocs'],
  decorators: [withButtonOverrides('.btn', 'click', 'Restorebtn download click')],
  argTypes: {
    backup: {
      description: 'A backup object with backupId and a restore URL',
    },
  },
};
type Story = StoryObj<typeof RestoreButton>;

export const Default: Story = {
  args: {
    backup: {
      ...backup,
      restore: {
        restore: null,
      },
    },
  },
};

export const Pending: Story = {
  args: {
    backup: {
      ...backup,
      restore: {
        ...backup.restore,
        status: 'pending',
      },
    },
  },
};

export const Download: Story = {
  args: {
    backup: {
      ...backup,
      restore: {
        ...backup.restore,
        status: 'success',
      },
    },
  },
};

export const Failed: Story = {
  args: {
    backup: {
      ...backup,
      restore: {
        ...backup.restore,
        status: 'failed',
      },
    },
  },
};
export default meta;

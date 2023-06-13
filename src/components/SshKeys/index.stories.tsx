import { Meta, StoryObj } from '@storybook/react';

import SshKeys from './index';
import withButtonOverrides from '../../../.storybook/decorators/withButtonOverrides';

/**
 * Ssh keys present in the settings menu
 */
const meta: Meta<typeof SshKeys> = {
  title: 'Components/SshKeys',
  component: SshKeys,
  tags: ['autodocs'],
  decorators: [withButtonOverrides('.btn-red', 'click', 'delete ssh key')],
};

const meData = {
  id: 1,
  email: 'me@me.com',
  sshKeys: [
    {
      id: 10,
      name: 'auto-add via api',
      keyType: 'ssh-rsa',
      created: '1978-01-14 14:25:01',
      keyFingerprint: 'SHA256:iLa2YGy/igmtxjM6C3ywV65umECdET/nIhaCeFlrWNs',
    },
    {
      id: 12,
      name: 'My Personal Key',
      keyType: 'ssh-ed25519',
      created: '2018-01-14 14:25:01',
      keyFingerprint: 'SHA256:iLa2YGy/igmtxjM6C3ywV65umECdET/nIhaCeFlrWNs',
    },
    {
      id: 14,
      name: 'My Other Key',
      keyType: 'ecdsa-sha2-nistp521',
      created: '2022-04-01 14:25:01',
      keyFingerprint: 'SHA256:RBRWA2mJFPK/8DtsxVoVzoSShFiuRAzlUBws7cXkwG0',
    },
  ],
};

const noKeys = {
  id: 1,
  email: 'me@me.com',
  sshKeys: [],
};

type Story = StoryObj<typeof SshKeys>;

export const Default: Story = {
  args: {
    me: meData,
  },
};

export const NoKeys: Story = {
  args: {
    me: noKeys,
  },
};

export const Loading: Story = {
  args: {
    me: noKeys,
    loading: true,
  },
};

export default meta;

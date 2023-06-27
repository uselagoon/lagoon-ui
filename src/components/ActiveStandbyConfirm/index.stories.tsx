import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import ActiveStandby, { ActiveStandbyConfirm as ActiveStandbyBaseComponent } from './index';

interface StoryProps {
  onProceedFunction: () => void;
  setInputValueFunction?: () => void;
  openBoolean: boolean;
  openModalFunction: () => void;
  closeModalFunction: () => void;
}

const meta: Meta<typeof ActiveStandbyBaseComponent> = {
  component: ActiveStandbyBaseComponent,
  title: 'Components/ActiveStandby and Confirm',
  tags: ['autodocs'],
  decorators: [
    storyFn => {
      const [open, setOpen] = useState(true);
      const actionOpen = action('open-modal');
      const actionClose = action('close-modal');
      return storyFn({
        openBoolean: open,
        openModalFunction: () => {
          actionOpen();
          setOpen(true);
        },
        closeModalFunction: () => {
          actionClose();
          setOpen(false);
        },
        onProceedFunction: action('active-standby-button-pressed'),
      });
    },
  ],
};

export const Default = ({ onProceedFunction }: { onProceedFunction: () => void }) => (
  <ActiveStandby activeEnvironment="Master-a" standbyEnvironment="Master-b" onProceed={onProceedFunction} />
);

export const WithConfirmationBlocked = ({
  onProceedFunction,
  setInputValueFunction,
  openBoolean,
  openModalFunction,
  closeModalFunction,
}: StoryProps) => (
  <ActiveStandbyBaseComponent
    activeEnvironment="Master-a"
    standbyEnvironment="Master-b"
    onProceed={onProceedFunction}
    open={openBoolean}
    openModal={openModalFunction}
    closeModal={closeModalFunction}
  />
);

export const WithConfirmationAllowed = ({
  onProceedFunction,
  setInputValueFunction,
  openBoolean,
  openModalFunction,
  closeModalFunction,
}: StoryProps) => (
  <ActiveStandbyBaseComponent
    activeEnvironment="Master-a"
    standbyEnvironment="Master-b"
    onProceed={onProceedFunction}
    open={openBoolean}
    openModal={openModalFunction}
    closeModal={closeModalFunction}
  />
);

export default meta;

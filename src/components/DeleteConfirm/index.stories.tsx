import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import DeleteConfirm, { DeleteConfirm as DeleteConfirmBaseComponent } from './index';

interface Props {
  onDeleteFunction: () => void;
  setInputValueFunction: () => void;
  openBoolean: () => void;
  openModalFunction: () => void;
  closeModalFunction: () => void;
}

const meta: Meta<typeof DeleteConfirmBaseComponent> = {
  component: DeleteConfirmBaseComponent,
  title: 'Components/Delete and Confirm',
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
        onDeleteFunction: action('delete-button-pressed'),
        setInputValueFunction: action('input-value-update-requested'),
      });
    },
  ],
};

export const Default = ({ onDeleteFunction }: { onDeleteFunction: () => void }) => (
  <DeleteConfirm deleteType="environment" deleteName="Forty-two" onDelete={onDeleteFunction} />
);

export const WithConfirmationBlocked = ({
  onDeleteFunction,
  setInputValueFunction,
  openBoolean,
  openModalFunction,
  closeModalFunction,
}: Props) => (
  <DeleteConfirmBaseComponent
    deleteType="environment"
    deleteName="Forty-two"
    onDelete={onDeleteFunction}
    inputValue=""
    setInputValue={setInputValueFunction}
    open={openBoolean}
    openModal={openModalFunction}
    closeModal={closeModalFunction}
  />
);

export default meta;

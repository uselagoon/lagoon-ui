import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import withButtonOverrides from '../../../.storybook/decorators/withButtonOverrides';
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

  render: args => {
    const [open, setOpen] = useState(true);
    return <DeleteConfirm {...args} open={open} closeModal={() => setOpen(false)} />;
  },
};

export const Default = () => (
  <DeleteConfirm
    deleteType="environment"
    deleteName="Forty-two"
    onDelete={(e: Event) => action('Delete confirmed')(e)}
  />
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

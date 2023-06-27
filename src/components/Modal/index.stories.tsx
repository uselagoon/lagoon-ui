import React, { MouseEvent, useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import Button from 'components/Button';

import Modal from './index';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Components/Modal',
};

const SampleContent = () => (
  <>
    <p>
      <strong>
        Pres <kbd>ESC</kbd> or click outside of this modal dialog to close it.
      </strong>
    </p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi reiciendis quaerat veniam. Itaque dolorum, nam
    nisi eum dolore voluptate veritatis!
  </>
);

const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <Button action={openModal}>Open modal</Button>
      <div id="__next"></div>
      <Modal {...args} isOpen={isOpen} onRequestClose={closeModal}>
        <SampleContent />
        <div className="form-input">
          <button className="hover-state margins" onClick={closeModal}>
            cancel
          </button>
          <Button
            action={(e: MouseEvent<HTMLButtonElement>) => {
              action('Confirm click')(e);
              closeModal();
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export const Default: StoryObj<typeof Modal> = {
  render: args => <ModalWrapper {...args} />,
  args: {
    contentLabel: 'Open Modal Dialog',
  },
};
export default meta;

import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import Modal from './index';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Components/Modal',
  decorators: [
    storyFn => {
      const [open, setOpen] = useState(true);
      const actionClose = action('close-modal');
      const props = {
        isOpenBoolean: open,
        onRequestCloseFunction: () => {
          actionClose();
          setOpen(false);
        },
        ariaHideApp: false,
      };

      return (
        <>
          <div id="__next">
            <p>This content should be hidden when the modal dialog is open.</p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae architecto repellat illum facilis assumenda,
            quia veritatis veniam magni ea dignissimos.
          </div>
          {storyFn(props)}
        </>
      );
    },
  ],
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

export const Default = ({
  isOpenBoolean,
  onRequestCloseFunction,
  ...rest
}: {
  isOpenBoolean: boolean;
  onRequestCloseFunction: () => void;
}) => (
  <Modal isOpen={isOpenBoolean} onRequestClose={onRequestCloseFunction} contentLabel="Open Modal Dialog" {...rest}>
    <SampleContent />
  </Modal>
);

export default meta;

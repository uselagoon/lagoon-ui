import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import Lipsum from 'storybook/components/Lipsum';

import Modal from './index';

export default {
  component: Modal,
  title: 'Components/Modal',
  decorators: [
    (storyFn) => {
      const [open, setOpen] = useState(true);
      const isOpen = boolean('Open modal', true) && open;
      const actionClose = action('close-modal');
      const props = {
        isOpenBoolean: isOpen,
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
            <Lipsum />
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
    <Lipsum />
  </>
);

export const Default = ({ isOpenBoolean, onRequestCloseFunction, ...rest }) => (
  <Modal isOpen={isOpenBoolean} onRequestClose={onRequestCloseFunction} contentLabel="Open Modal Dialog" {...rest}>
    <SampleContent />
  </Modal>
);

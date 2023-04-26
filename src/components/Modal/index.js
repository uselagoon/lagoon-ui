import React from 'react';
import ReactModal from 'react-modal';

import PropTypes from 'prop-types';

/**
 * A styled modal dialog.
 */
const Modal = ({ isOpen, onRequestClose, contentLabel, children, variant, ...rest }) => {
  // ReactModal throws an error in environments where the document isn't loaded.
  try {
    ReactModal.setAppElement('#__next');
  } catch {}

  return (
    <>
      <ReactModal
        className={`modal__content ${variant ? `modal-${variant}` : ''} `}
        overlayClassName="modal__overlay"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        {...rest}
      >
        {children}
      </ReactModal>
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    contentLabel: PropTypes.string,
    children: PropTypes.any,
  };
}

export default Modal;

import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

/**
 * A styled modal dialog.
 */
const Modal = ({ isOpen, onRequestClose, contentLabel, children, ...rest }) => {
  // ReactModal throws an error in environments where the document isn't loaded.
  try {
    ReactModal.setAppElement("#__next");
  } catch {}

  return (
    <>
      <ReactModal
        className="modal__content"
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

if (process.env.NODE_ENV !== "production") {
  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    contentLabel: PropTypes.string,
    children: PropTypes.any,
  };
}

export default Modal;

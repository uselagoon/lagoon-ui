import React, { Fragment } from "react";
import Modal from "components/Modal";
import {
  StyledErrorModal,
} from "./StyledErrorModal";
import { LockOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const ErrorModal = ({
  open,
  close,
}) => {
  return (
    <Fragment>
      <Modal
        isOpen={open}
        onRequestClose={close}
        contentLabel={`Confirm`}
      >
        <StyledErrorModal>
            <div className="close-modal">
              <CloseCircleOutlined onClick={close}/>
            </div>
            <LockOutlined className="icon" />
            <h4><b>Unauthorized</b></h4>
            <div className="error-modal">
              <span>You don't have permission to view variable values.</span>
              <span> Contact your administrator to obtain the relevant permissions.</span>
            </div>
        </StyledErrorModal>
      </Modal>
    </Fragment>
  );
};

export default ErrorModal;

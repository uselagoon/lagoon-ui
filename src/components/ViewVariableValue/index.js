import React, { Fragment } from "react";
import Modal from "components/Modal";
import { bp, color } from "lib/variables";
import withLogic from "components/ViewVariableValue/logic";

/**
 * Displays the value of the selected variable.
 */
export const ViewVariableValue = ({
  variableName,
  variableValue,
  onProceed,
  open,
  openModal,
  closeModal,
}) => {
  return (
    <Fragment>
      <div className="margins">
        <a className="hover-state" onClick={openModal}>
          <label>View full value</label>
        </a>
      </div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        variant="large"
      >
        <Fragment>
          <button type="button" className="button-sort">
            Variable Name
          </button>
          <div className="data-row row-heading">
            <div className="col col-3">{variableName}</div>
          </div>
          <button type="button" className="button-sort">
            Variable Value
          </button>
          <div className="data-row row-heading">
            <div className="col col-3">{variableValue}</div>
          </div>

          <div className="form-input">
            <a href="#" className="hover-state margins" onClick={closeModal}>
              Close
            </a>
          </div>
        </Fragment>
      </Modal>
      <style jsx>{`
        .view-var-btn {
          padding: 0;
        }
        .margins {
          margin-right: 10px;
        }
        input {
          margin-right: 10px;
          width: 100%;
        }
        .environment-name {
          font-weight: bold;
          color: ${color.lightBlue};
        }
        a.hover-state {
          margin-right: 10px;
          color: ${color.blue};
        }
        .form-input {
          display: flex;
          align-items: center;
        }
        label {
          color: ${color.blue};
        }
        .button-sort {
          color: ${color.blue};
          position: relative;
          font-family: "source-code-pro", sans-serif;
          font-size: 13px;
          font-size: 0.8125rem;
          line-height: 1.4;
          text-transform: uppercase;
          border: none;
          background: none;
          cursor: pointer;
          &:after {
            position: absolute;
            right: -18px;
            top: 0;
            width: 20px;
            height: 20px;
          }
          &.ascending:after {
            content: " \\25B2";
          }
          &.descending:after {
            content: " \\25BC";
          }
          &:first-child {
            padding-left: 0;
          }
        }
        .data-row {
          border-radius: 0;
          line-height: 1.5rem;
          @media ${bp.smallOnly} {
            padding: 10px;
          }
          @media ${bp.wideUp} {
            padding: 15px 0;
          }
          &:first-child {
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
          }
          &:last-child {
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
          }
          .col {
            @media ${bp.wideUp} {
              padding: 0 20px;
            }
            width: 33.33%;
          }
          .col-3 {
            width: fit-content;
            line-break: anywhere;
          }
          a.external-link {
            color: ${color.brightBlue};
            text-decoration: underline;
            font-style: italic;
          }
        }
        .row-heading {
          background: ${color.white};
        }
        .table-header {
          @media ${bp.smallOnly} {
            flex-wrap: wrap;
            margin: 10px;
          }
          @media ${bp.wideUp} {
            align-items: center;
            display: flex;
            margin: 15px 20px 10px;
          }
          display: flex;
          justify-content: space-around;
          label {
            display: none;
            padding-left: 20px;
            @media ${bp.wideUp} {
              display: block;
            }
          }
        }
      `}</style>
    </Fragment>
  );
};

export default withLogic(ViewVariableValue);

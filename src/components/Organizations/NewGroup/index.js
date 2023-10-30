import React from 'react';
import { Mutation } from 'react-apollo';

import Button from 'components/Button';
import Modal from 'components/Modal';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/NewGroup/logic';
import gql from 'graphql-tag';
import { color } from 'lib/variables';
import styled from 'styled-components';

import { Footer, StyledNotification } from '../SharedStyles';

const ADD_GROUP_MUTATION = gql`
  mutation addGroupToOrganization($group: String!, $organization: Int!) {
    addGroupToOrganization(input: { name: $group, organization: $organization }) {
      name
    }
  }
`;

const customStyles = {
  content: {
    width: '50%',
  },
};

const StyledNewGroup = styled.div`
  .margins {
    margin: 2rem 10px 2rem 0;
  }
  .modal-content {
    max-width: 70%;
  }
  .form-box input,
  textarea {
    display: block;
    width: 100%;
    border-width: 1px;
    border-style: solid;
    min-height: 38px;
    border-color: hsl(0, 0%, 80%);
    font-family: 'source-code-pro', sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #000;
    background: #fff;
    padding: 8px;
    box-sizing: border-box;
  }
  input[type='text']:focus {
    border: 2px solid ${color.linkBlue};
    outline: none;
  }
  input[type='text']::placeholder {
    color: #000;
  }
  .select {
    font-family: 'source-sans-pro', sans-serif;
    line-height: 1.25rem;
    div {
      border-radius: 0 !important;
    }
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
`;
/**
 * Confirms the deletion of the specified name and type.
 */
export const NewGroup = ({
  existingGroupNames,
  onGroupAdded,
  disabled,
  inputValueGroup,
  organizationId,
  setInputValue,
  open,
  openModal,
  closeModal,
}) => {
  return (
    <StyledNewGroup>
      <div className="margins">
        <Button disabled={disabled} action={openModal} testId="addNewGroup">
          <span style={{ display: 'inline-flex', alignContent: 'center', gap: '10px' }}>
            <span style={{ fontSize: '28px' }}>+</span>
            <span style={{ fontSize: '16px', lineHeight: '24px' }}>Group</span>
          </span>
        </Button>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <Mutation mutation={ADD_GROUP_MUTATION}>
            {(addGroup, { called, error, data }) => {
              if (error) {
                return <div>{error.message}</div>;
              }
              if (data) {
                // hacky
                onGroupAdded().then(() => {
                  setInputValue({ target: { value: '' } });
                  closeModal();
                });
              }
              return (
                <StyledNotification>
                  <div className="newMember">
                    <h4>New Group</h4>
                    <div className="form-box">
                      <label>
                        Group Name: <span style={{ color: '#E30000' }}>*</span>{' '}
                        <input
                          className="inputEmail"
                          type="text"
                          placeholder="Enter name"
                          value={inputValueGroup}
                          onChange={e => {
                            const newVal = e.target.value;
                            const allowedChars = /^[a-z0-9-]*$/;
                            if (!allowedChars.test(newVal)) return;
                            // recompose wants the whole event
                            setInputValue(e);
                          }}
                        />
                      </label>
                    </div>
                    <div>
                      <Footer>
                        <Button
                          testId='createGroup'
                          disabled={
                            called ||
                            inputValueGroup === '' ||
                            inputValueGroup.indexOf(' ') > 0 ||
                            existingGroupNames.includes(inputValueGroup)
                          }
                          action={() => {
                            addGroup({
                              variables: {
                                group: inputValueGroup,
                                organization: parseInt(organizationId, 10),
                              },
                            });
                          }}
                          variant="primary"
                          loading={called}
                        >
                          Create
                        </Button>

                        <Button variant="ghost" action={() => closeModal()}>
                          Cancel
                        </Button>
                      </Footer>
                    </div>
                  </div>
                </StyledNotification>
              );
            }}
          </Mutation>
        </React.Fragment>
      </Modal>
    </StyledNewGroup>
  );
};

export default withLogic(NewGroup);

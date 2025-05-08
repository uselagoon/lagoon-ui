import React from 'react';
import { useMutation } from '@apollo/client';

import { Tooltip } from 'antd';
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

  const [ addGroup, {loading, error, reset} ] = useMutation(ADD_GROUP_MUTATION, {
    variables: {
      group: inputValueGroup,
      organization: parseInt(organizationId, 10),
    },
    onCompleted: () => {
      onGroupAdded().then(() => {
        setInputValue({ target: { value: '' } });
        closeModal();
      });
    },
    onError: e => console.error(e),
  });

  return (
    <StyledNewGroup>
      <div className="margins">
        <Tooltip overlayClassName="orgTooltip" title="Add a new group" placement="bottom">
          <>
            <Button testId="addNewGroup" disabled={disabled} action={openModal}>
              <span style={{ display: 'inline-flex', alignContent: 'center', gap: '10px' }}>Add Group</span>
            </Button>
          </>
        </Tooltip>
      </div>
      <Modal isOpen={open} onRequestClose={closeModal} contentLabel={`Confirm`} style={customStyles}>
        <React.Fragment>
          <StyledNotification>
            { error ?
              <>
                <p style={{ display: "inline-block" }}>{error?.message} </p>
                <div style={{ float: 'right' }}>
                  <Button variant="ghost" action={closeModal} >
                    Cancel
                  </Button>
                </div>
              </>
              :
              <>
                <div className="newMember">
                  <h4>New Group</h4>
                  <div className="form-box">
                    <label>
                      Group Name: <span style={{ color: '#E30000' }}>*</span>{' '}
                      <input
                        className="inputEmail"
                        data-cy="groupName-input"
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
                      <p className="explainer">Please use (a to z) lower case, numbers and - only</p>
                      <Button
                        testId="createGroup"
                        disabled={
                          loading ||
                          inputValueGroup === '' ||
                          inputValueGroup.indexOf(' ') > 0 ||
                          existingGroupNames.includes(inputValueGroup)
                        }
                        action={addGroup}
                        variant="primary"
                        loading={loading}
                      >
                        Create
                      </Button>

                      <Button variant="ghost" action={() => closeModal()}>
                        Cancel
                      </Button>

                    </Footer>
                  </div>
                </div>
              </>
            }
          </StyledNotification>
        </React.Fragment>
      </Modal>
    </StyledNewGroup>
  );
};

export default withLogic(NewGroup);

import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { bp, color } from 'lib/variables';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/NewGroup/logic';
import ReactSelect from 'react-select';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ADD_GROUP_MUTATION = gql`
  mutation addGroup($group: String!, $organization: Int!) {
    addGroup(input:{
      name: $group
      organization: $organization
    }){
      name
    }
  }
`;

const customStyles = {
  content : {
    width : '50%',
  }
};

/**
 * Confirms the deletion of the specified name and type.
 */
export const NewGroup = ({
  inputValueGroup,
  organizationId,
  setInputValue,
  selectedRole,
  setSelectedRole,
  onProceed,
  open,
  openModal,
  closeModal
}) => {
  return (
    <React.Fragment>
      <div className="margins"><Button action={openModal}>
        Create Group
      </Button></div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        style={customStyles}
      >
        <React.Fragment>
        <Mutation mutation={ADD_GROUP_MUTATION}>
          {(addGroup, {loading, error, data}) => {
            if (error) {
              return <div>{error.message}</div>;
            }
            if (data) {
              window.location.reload();
            }
            return (
              <div className="newMember">
                <h4>Create Group</h4>
                <div className="form-box">
                  <label>Group Name: <input className="inputEmail" type="text" value={inputValueGroup} onChange={setInputValue} /></label>
                </div>
                <div>
                  <p></p>
                  <Button
                    disabled={inputValueGroup === "" || inputValueGroup.indexOf(' ') > 0}
                    action={() => {
                      addGroup({
                      variables: {
                        group: inputValueGroup,
                        organization: parseInt(organizationId, 10)
                        }
                      });
                      window.location.reload();
                      }
                    }
                    variant='green'
                  >Create
                  </Button>
                </div>
              </div>
            );
          }}
          </Mutation>
        </React.Fragment>
      </Modal>
      <style jsx>{`
        .margins{
          margin-right: 10px;
        }
        .modal-content {
          max-width: 70%;
        }
        .form-box input, textarea{
          display: block;
          width: 100%;
          border-width:1px;
          border-style: solid;
          border-radius: 4px;
          min-height: 38px;
          border-color: hsl(0,0%,80%);
          font-family: 'source-code-pro',sans-serif;
          font-size: 0.8125rem;
          color: #5f6f7a;
          padding: 8px;
          box-sizing: border-box;
        }
        input[type="text"]:focus {
          border: 2px solid ${color.linkBlue};
          outline: none;
        }
        .selectRole {
          font-family: 'source-sans-pro', sans-serif;
          line-height: 1.25rem;
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
      `}</style>
    </React.Fragment>
  );
};

export default withLogic(NewGroup);

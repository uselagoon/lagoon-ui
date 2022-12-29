import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { bp, color } from 'lib/variables';
// @TODO: add this once the logic exists
import withLogic from 'components/Organizations/AddGroupToProject/logic';
import ReactSelect from 'react-select';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


const ADD_GROUP_PROJECT_MUTATION = gql`
  mutation addProjectToGroup($groupName: String!, $projectName: String!) {
    addGroupsToProject(input:{
      groups:{
        name: $groupName
      }
      project:{
        name: $projectName
      }
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
export const AddGroupToProject = ({
  project,
  inputValueEmail,
  projectName,
  organizationId,
  setInputValue,
  selectedProject,
  options,
  setSelectedProject,
  onProceed,
  open,
  openModal,
  closeModal
}) => {
  return (
    <React.Fragment>
      <div className="margins"><Button action={openModal}>
        Add group to project
      </Button></div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel={`Confirm`}
        style={customStyles}
      >
        <React.Fragment>
        <Mutation mutation={ADD_GROUP_PROJECT_MUTATION}>
          {(addGroupProject, {loading, error, data}) => {
            if (error) {
              return <div>{error.message}</div>;
            }
            if (data) {
              window.location.reload();
            }
            return (
              <div className="newMember">
                <h4>Add group to project</h4>
                <label>Group
                <div className="selectRole">
                  <ReactSelect
                    menuPortalTarget={document.body} 
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    aria-label="Group"
                    placeholder="Select a group..."
                    name="group"
                    value={options.find(o => o.value === selectedProject)}
                    onChange={selectedOption => setSelectedProject(selectedOption)}
                    options={options}
                    required
                  />
                </div></label>
                <div>
                  <p></p>
                  <Button
                    disabled={selectedProject === null}
                    action={() => {
                      addGroupProject({
                      variables: {
                          projectName: projectName,
                          groupName: selectedProject.value,
                        }
                      })
                      }
                    }
                    variant='green'
                  >Add
                  </Button>
                </div>
              </div>
            );
          }}
          </Mutation>
        </React.Fragment>
      </Modal>
      <style jsx>{`
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
        optgroup,
        select,
        textarea {
          font-family: 'source-sans-pro', sans-serif;
          line-height: 1.25rem;
        }
      `}</style>
    </React.Fragment>
  );
};

export default withLogic(AddGroupToProject);

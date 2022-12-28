import React, { useState } from 'react';
import * as R from 'ramda';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import gql from 'graphql-tag';
import { bp, color, fontSize } from 'lib/variables';
import { Mutation } from 'react-apollo';
import ReactSelect from 'react-select';
import Button from 'components/Button';
import withLogic from 'components/Organizations/ProjectNotificationsSideBar/logic';
import { Query } from 'react-apollo';
import OrganizationByIDQuery from 'lib/query/organizations/OrganizationByID';
import withQueryLoading from 'lib/withQueryLoading';
import withQueryError from 'lib/withQueryError';
import { withOrganizationRequired } from 'lib/withDataRequired';

const ADD_PROJECT_NOTIFICATION_MUTATION = gql`
  mutation addNotificationToProject($notificationType: NotificationType!, $notificationName: String!, $projectName: String!) {
    addNotificationToProject(input:{
      notificationType: $notificationType
      notificationName: $notificationName
      project: $projectName
    }){
      id
    }
  }
`;


// let options = [];

const ProjectNotificationsSideBar = ({ project,
  inputValueEmail,
  projectName,
  organizationId,
  setInputValue,
  selectedProject,
  options,
  setSelectedProject }) => {
  return (
    <div className="details">
    <Mutation mutation={ADD_PROJECT_NOTIFICATION_MUTATION}>
    {(addNotificationToProject, {loading, error, data}) => {
      if (error) {
        return <div>{error.message}</div>;
      }

      // var opts = options.slacks.map(group => {return {label: group.__typename + ":" + group.name, value: group.__typename + ":" + group.name} })
      var ops = [...options.slacks, ...options.rocketchats, ...options.teams, ...options.emails, ...options.webhook]
      var opts = ops.map(group => {return {label: group.__typename.split("Notification")[1] + ": " + group.name, value: group.__typename.split("Notification")[1].toUpperCase() + ":" + group.name} })
      return (
        <>
          <div className="newMember">
            <h4>Add notification to project</h4>
            <label>Notification
            <div className="selectRole">
              <ReactSelect
                aria-label="Notification"
                placeholder="Select a notification..."
                name="notification"
                value={opts.find(o => o.value === selectedProject)}
                onChange={selectedOption => setSelectedProject(selectedOption)}
                options={opts}
                required
              />
            </div></label>
            <div>
              <p></p>
              <Button
                disabled={selectedProject === null}
                action={() => {
                  addNotificationToProject({
                  variables: {
                      projectName: projectName,
                      notificationType: selectedProject.value.split(":")[0],
                      notificationName: selectedProject.value.split(":")[1],
                    }
                  })
                  window.location.reload();
                  }
                }
                variant='green'
              >Add
              </Button>
            </div>
          </div>
        </>
        );
      }}
    </Mutation>
    <style jsx>{`
      .newMember {
        background: ${color.lightGrey};
        padding: 15px;
        border-width:1px;
        border-style: solid;
        border-radius: 4px;
        border-color: hsl(0,0%,90%);
        @media ${bp.smallOnly} {
          margin-bottom: 20px;
          order: -1;
          width: 100%;
        }
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
    `}</style>
    </div>
  );
};

export default withLogic(ProjectNotificationsSideBar);

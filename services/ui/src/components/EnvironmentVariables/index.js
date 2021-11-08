import React from 'react';
import Button from 'components/Button';
// import { useMutation } from '@apollo/client';
// import DeleteEnvironmentVariableById from 'lib/mutation/DeleteEnvironmentVariableById';
import Me from 'lib/query/Me';
import { bp, color, fontSize } from 'lib/variables';

const EnvironmentVariables = ({variables}) => {

  // const [deleteEnvironmentVariableById, { data, loading, error, called }] = useMutation(DeleteEnvironmentVariableById, {
  //   refetchQueries: [{ query: Me }]
  // });

  return(
    <>
      <div className="environment-variables">
        <div className="header">
          <label className="name">Name</label>
          <label className="value">Value</label>
          <label className="scope">Scope</label>
          <label className="actions">Action</label>
        </div>
        <div className="data-table">
          {!variables.length && <div className="data-none">No environment variables</div>}
          {variables.length && variables.map(variable => (
            <div className="data-row" key={variable.id}>
              <div className="name">{variable.name}</div>
              <div className="value">{variable.value}</div>
              <div className="scope">{variable.scope}</div>
              <div className="actions">
                {/* {called && <div>Deleting environment variable...</div>} */}
                <Button variant="red" action={() => deleteEnvironmentVariableById({
                  variables: {
                    input: {
                      id: variables.id,
                    }
                  }
                })}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
        <style jsx>{`
          .environment-variables {
          }
          
          .header {
            display: flex;
            padding: 1em;
            
            .name, .value, .scope, .actions, {
              width: 25%;
            }

            .actions {
              text-align: right;
            }
          }

          .data-table {
            background-color: ${color.white};
            border: 1px solid ${color.lightestGrey};
            border-radius: 3px;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
            
            .data-none {
              border: 1px solid ${color.white};
              border-bottom: 1px solid ${color.lightestGrey};
              border-radius: 3px;
              line-height: 1.5rem;
            }
            
            .data-row {
              border: 1px solid ${color.white};
              border-bottom: 1px solid ${color.lightestGrey};
              border-radius: 0;
              line-height: 1.5rem;
              padding: 1em 0;

              @media ${bp.wideUp} {
                display: flex;
              }

              & > div {
                @media ${bp.wideUp} {
                  &.name {
                    width: 25%;
                    padding-left: 1em;
                    overflow-wrap: break-word;
                  }
                  
                  &.value {
                    width: 25%;
                  }

                  &.scope {
                    width: 25%;
                  }
                  
                  &.actions {
                    width: 25%;
                    text-align: right;
                  }
                }
              }
              
              &:hover {
                border: 1px solid ${color.brightBlue};
              }
              
              &:first-child {
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
              }
              
              &:last-child {
                border-bottom-left-radius: 3px;
                border-bottom-right-radius: 3px;
              }
            }
          }
          
          `}</style>
      </div>
    </>
  );
};

export default EnvironmentVariables;

import React from 'react';
import css from 'styled-jsx/css';
import moment from 'moment';
import Button from 'components/Button';
// import { useMutation } from '@apollo/client';
// import DeleteEnvironmentVariableById from 'lib/mutation/DeleteEnvironmentVariableById';
import Me from 'lib/query/Me';
import { bp, color, fontSize } from 'lib/variables';
import { Container } from 'semantic-ui-react';

const EnvironmentVariables = ({me: { id, email }}) => {

  // const [deleteEnvironmentVariableById, { data, loading, error, called }] = useMutation(DeleteEnvironmentVariableById, {
  //   refetchQueries: [{ query: Me }]
  // });

  const error = null;
  const loading = null;
  const called = null;

  const variables = [{
    id: 1,
    name: "Test",
    value: "123"
  }];

  return(
    <Container>
      <div className="environment-variables">
        <div className="header">
          <label className="name">Name</label>
          <label className="type">Value</label>
        </div>
        <div className="data-table">
          {!variables.length && <div className="data-none">No environment variables</div>}
          {variables.map(variable => (
            <div className="data-row" key={variable.id}>
              <div className="name">{variable.id} - {variable.name}</div>
              <div className="value">{variable.value}</div>
              <div className="delete">
                {error && <div>{error.message}</div>}
                {called && <div>Deleting environment variable...</div>}
                <Button variant='red' action={() => deleteEnvironmentVariableById({
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
          .header {
            @media ${bp.wideUp} {
              align-items: center;
              display: flex;
              margin: 0 0 14px;
              padding-right: 40px;
            }
            @media ${bp.smallOnly} {
              flex-wrap: wrap;
            }
            @media ${bp.tabletUp} {
              margin-top: 40px;
            }
            
            label {
              display: none;
              padding-left: 20px;
              @media ${bp.wideUp} {
                display: block;
              }
              
              &.name {
                width: 25%;
                @media ${bp.extraWideUp} {
                  width: 25%;
                }
              }
              
              &.value {
                width: 75%;
                @media ${bp.extraWideUp} {
                  width: 75%;
                }
              }
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
              padding: 8px 0 7px 0;
              text-align: center;
            }
            
            .data-row {
              border: 1px solid ${color.white};
              border-bottom: 1px solid ${color.lightestGrey};
              border-radius: 0;
              line-height: 1.5rem;
              padding: 8px 0 7px 0;
              @media ${bp.wideUp} {
                display: flex;
                justify-content: space-between;
                padding-right: 15px;
              }

              & > div {
                padding-left: 20px;
                @media ${bp.wideDown} {
                  padding-right: 40px;
                }
                @media ${bp.wideUp} {
                  &.name {
                    align-self: center;
                    width: 25%;
                    overflow-wrap: break-word;
                  }
                  
                  &.value {
                    align-self: center;
                    width: 55%;
                  }
                  
                  &.delete {
                    width: 25%;
                    @media ${bp.extraWideUp} {
                      width: 20%;
                    }
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
    </Container>
  );
};

export default EnvironmentVariables;

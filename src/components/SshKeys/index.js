import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Button from 'components/Button';
import { Mutation } from 'react-apollo';
import DeleteSshKeyById from 'lib/mutation/DeleteSshKeyById';
import Me from 'lib/query/Me';
import {StyledKeys} from "./StyledKeys"
import Skeleton from 'react-loading-skeleton';

const SshKeys = ( {me: { id, email, sshKeys: keys }, loading} ) => {

  const [isLoading, setIsLoading] = useState(loading);

  useEffect(()=>{
    setIsLoading(loading);
  },[loading])


  return(
    <StyledKeys>
      <div className="header">
        <label className="name">Name</label>
        <label className="type">Type</label>
        <label className="fingerprint">Fingerprint</label>
        <label className="created">Created</label>
      </div>
      {isLoading ? 
      <Skeleton count={5} height={25}/> :
      <div className="data-table">
        {!keys?.length && <div className="data-none">No SSH keys</div>}

        {keys && keys.map(key => (
          <div className="data-row" key={key.id}>
            <div className="name">{key.id} - {key.name}</div>
            <div className="type">{key.keyType}</div>
            <div className="fingerprint">{key.keyFingerprint}</div>
            <div className="created chromatic-ignore">{moment
                .utc(key.created)
                .local()
                .format('DD MMM YYYY, HH:mm:ss (Z)')}</div>
            <div className="delete">
              <Mutation mutation={DeleteSshKeyById} refetchQueries={[{ query: Me}]}>
                {(deleteSshKeyById, { loading, called, error, data }) => {

                  if (error) {
                    return <div>{error.message}</div>;
                  }

                  if (called) {
                    return <div>Deleting SSH Key...</div>;
                  }
                  return (
                    <Button variant='red' action={() => deleteSshKeyById({
                      variables: {
                        input: {
                          id: key.id,
                        }
                      }
                    })}>Delete</Button>
                  );
                }}
              </Mutation>
            </div>
          </div>
        ))}
      </div>
      }
    </StyledKeys>
  );
};

export default SshKeys;

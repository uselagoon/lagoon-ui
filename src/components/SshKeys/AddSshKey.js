import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { Space } from 'antd';
import Button from 'components/Button';
import Me from 'lib/query/Me';

import AddUserSSHPublicKey from '../../lib/mutation/AddUserSSHPublicKey';

const AddSshKey = ({ me: { id, email } }) => {
  const defaultValues = { sshKeyName: '', sshKey: '' };
  const [values, setValues] = useState(defaultValues);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="addSshKey">
      <Mutation mutation={AddUserSSHPublicKey} refetchQueries={[{ query: Me }]} onError={e => console.error(e)}>
        {(addUserSSHPublicKey, { loading, called, error, data }) => {
          const addSshKeyHandler = () => {
            addUserSSHPublicKey({
              variables: {
                input: {
                  name: values.sshKeyName,
                  publicKey: values.sshKey,
                  user: {
                    id,
                    email,
                  },
                },
              },
            });

            setValues(defaultValues);
          };

          return (
            <div className="addNew">
              <div>
                <label htmlFor="sshKeyName">SSH Key Name</label>
                <input
                  data-cy="sshKeyName"
                  id="sshKeyName"
                  name="sshKeyName"
                  className="addSshKeyInput"
                  type="text"
                  value={values.sshKeyName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="sshKey">SSH Key</label>
                <textarea
                  data-cy="sshKey"
                  id="sshKey"
                  name="sshKey"
                  className="addSshKeyInput"
                  type="text"
                  onChange={handleChange}
                  value={values.sshKey}
                  placeholder="Begins with 'ssh-rsa', 'ssh-ed25519', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521'"
                />
              </div>
              <Space direction="vertical" size="large">
                <Button
                  loading={!error && called && loading}
                  disabled={!values.sshKey || !values.sshKeyName}
                  action={addSshKeyHandler}
                >
                  Add
                </Button>

                {error ? <div className="error">{error.message.replace('GraphQL error:', '').trim()}</div> : ''}
              </Space>
            </div>
          );
        }}
      </Mutation>

      <style jsx>{`
        .error {
          color: #e64545;
        }
        .addNew {
          margin-top: 3em;
        }
        .addSshKeyInput {
          width: 100%;
          margin-bottom: 15px;
        }
        .fade {
          opacity: 0;
          -webkit-transition: opacity 0.15s linear;
          -o-transition: opacity 0.15s linear;
          transition: opacity 0.15s linear;
        }
        .fade-in {
          opacity: 1;
          -webkit-transition: opacity 0.15s linear;
          -o-transition: opacity 0.15s linear;
          transition: opacity 0.15s linear;
        }
        .sshKeyError {
          margin-top: 15px;
          color: #a94442;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default AddSshKey;

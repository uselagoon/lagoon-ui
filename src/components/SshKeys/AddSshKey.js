import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import Button from 'components/Button';
import Me from 'lib/query/Me';
import { bp, color, fontSize } from 'lib/variables';
import { none } from 'ramda';
import css from 'styled-jsx/css';

import AddSshKeyMutation from '../../lib/mutation/AddSshKey';

const AddSshKey = ({ me: { id, email } }) => {
  const defaultValues = { sshKeyName: '', sshKey: '' };
  const [values, setValues] = useState(defaultValues);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const regex = /\s*(ssh-rsa|ssh-ed25519|ecdsa-sha2-nistp256|ecdsa-sha2-nistp384|ecdsa-sha2-nistp521)\s(\S+)/;
  // First capture group is the type of the ssh key
  // Second capture group is the actual ssh key
  // Whitespace and comments are ignored

  const isFormValid = values.sshKeyName !== '' && !values.sshKey.includes('\n') && values.sshKey.match(regex);

  return (
    <div className="addSshKey">
      <Mutation mutation={AddSshKeyMutation} refetchQueries={[{ query: Me }]}>
        {(addSshKey, { loading, called, error, data }) => {
          const addSshKeyHandler = () => {
            addSshKey({
              variables: {
                input: {
                  name: values.sshKeyName,
                  keyValue: values.sshKey.match(regex)[2],
                  keyType: values.sshKey.match(regex)[1].replace(/-/g, '_').toUpperCase(),
                  user: {
                    id,
                    email,
                  },
                },
              },
            });
            setValues(defaultValues);
          };

          if (!error && called && loading) {
            return <div>Adding SSH Key...</div>;
          }

          return (
            <div className="addNew">
              {error ? <div className="error">{error.message.replace('GraphQL error:', '').trim()}</div> : ''}

              <div>
                <label htmlFor="sshKeyName">SSH Key Name</label>
                <input
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
                  id="sshKey"
                  name="sshKey"
                  className="addSshKeyInput"
                  type="text"
                  onChange={handleChange}
                  value={values.sshKey}
                  placeholder="Begins with 'ssh-rsa', 'ssh-ed25519', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521'"
                />
              </div>
              <Button disabled={!isFormValid} action={addSshKeyHandler}>
                Add
              </Button>
              <div className="sshKeyError">
                <span className={values.sshKey == '' || isFormValid ? 'fade' : 'fade-in'}>
                  {values.sshKeyName == '' ? 'Please enter a SSH Key name' : 'The SSH Key entered is invalid'}
                </span>
              </div>
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

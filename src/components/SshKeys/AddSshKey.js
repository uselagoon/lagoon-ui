import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import Button from 'components/Button';
import Me from 'lib/query/Me';
import useTranslation from 'lib/useTranslation';

import AddSshKeyMutation from '../../lib/mutation/AddSshKey';

const AddSshKey = ({ me: { id, email } }) => {
  const t = useTranslation();

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
            return <div>{t('settings.addingKey')}</div>;
          }

          return (
            <div className="addNew">
              {error ? <div className="error">{error.message.replace('GraphQL error:', '').trim()}</div> : ''}

              <div>
                <label htmlFor="sshKeyName">{t('settings.keyName')}</label>
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
                <label htmlFor="sshKey">{t('settings.sshKey')}</label>
                <textarea
                  id="sshKey"
                  name="sshKey"
                  className="addSshKeyInput"
                  type="text"
                  onChange={handleChange}
                  value={values.sshKey}
                  placeholder={t('placeholders.sshKey')}
                />
              </div>
              <Button disabled={!isFormValid} action={addSshKeyHandler}>
                {t('settings.add')}
              </Button>
              <div className="sshKeyError">
                <span className={values.sshKey == '' || isFormValid ? 'fade' : 'fade-in'}>
                  {values.sshKeyName == '' ? t('settings.enterKey') : t('settings.invalidKey')}
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

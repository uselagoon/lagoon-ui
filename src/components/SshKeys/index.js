import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import Skeleton from 'react-loading-skeleton';

import Button from 'components/Button';
import DeleteSshKeyById from 'lib/mutation/DeleteSshKeyById';
import Me from 'lib/query/Me';
import useTranslation from 'lib/useTranslation';
import moment from 'moment';

import { StyledKeys } from './StyledKeys';

const SshKeys = ({ me: { id, email, sshKeys: keys }, loading }) => {
  const t = useTranslation();
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <StyledKeys>
      <div className="header">
        <label className="name">{t('settings.name')}</label>
        <label className="type">{t('settings.type')}</label>
        <label className="fingerprint">{t('settings.fingerprint')}</label>
        <label className="created">{t('settings.created')}</label>
      </div>
      {isLoading ? (
        <Skeleton count={5} height={25} />
      ) : (
        <div className="data-table">
          {!keys?.length && <div className="data-none">{t('settings.noKeys')}</div>}

          {keys &&
            keys.map(key => (
              <div className="data-row" key={key.id}>
                <div className="name">
                  {key.id} - {key.name}
                </div>
                <div className="type">{key.keyType}</div>
                <div className="fingerprint">{key.keyFingerprint}</div>
                <div className="created chromatic-ignore">
                  {moment.utc(key.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}
                </div>
                <div className="delete">
                  <Mutation mutation={DeleteSshKeyById} refetchQueries={[{ query: Me }]}>
                    {(deleteSshKeyById, { loading, called, error, data }) => {
                      if (error) {
                        return <div>{error.message}</div>;
                      }

                      if (called) {
                        return <div>{t('settings.deletingKey')}</div>;
                      }
                      return (
                        <Button
                          variant="red"
                          action={() =>
                            deleteSshKeyById({
                              variables: {
                                input: {
                                  id: key.id,
                                },
                              },
                            })
                          }
                        >
                          {t('settings.delete')}
                        </Button>
                      );
                    }}
                  </Mutation>
                </div>
              </div>
            ))}
        </div>
      )}
    </StyledKeys>
  );
};

export default SshKeys;

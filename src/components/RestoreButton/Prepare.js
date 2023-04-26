import React from 'react';
import { Mutation } from 'react-apollo';

import Button from 'components/Button';
import gql from 'graphql-tag';
import useTranslation from 'lib/useTranslation';

const addRestore = gql`
  mutation addRestore($input: AddRestoreInput!) {
    addRestore(input: $input) {
      id
    }
  }
`;

const Prepare = ({ backupId }) => {
  const t = useTranslation();
  return (
    <Mutation mutation={addRestore} variables={{ input: { backupId } }}>
      {(addRestore, { loading, called, error, data }) => {
        if (error) {
          return <Button disabled>{t('backups.restore.retrieveFailed')}</Button>;
        }

        if (loading || called) {
          return <Button disabled>{t('backups.restore.retrieving')}</Button>;
        }

        return <Button action={addRestore}>{t('backups.restore.retrieve')}</Button>;
      }}
    </Mutation>
  );
};

export default Prepare;

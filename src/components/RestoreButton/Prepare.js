import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import Button from 'components/Button';
import gql from 'graphql-tag';

const addRestoreMutation = gql`
  mutation addRestore($input: AddRestoreInput!) {
    addRestore(input: $input) {
      id
    }
  }
`;

const Prepare = ({ backupId }) => {
  const [addRestore, { loading, error, called }] = useMutation(addRestoreMutation, {
    variables: { input: { backupId } },
    onCompleted: () => {
      console.log('Restore added successfully');
    },
  });

  if (loading || called) {
    return <Button disabled>Retrieving...</Button>;
  }

  if (error) {
    return <Button disabled>Retrieve failed</Button>;
  }

  return (
    <Button testId="retrieve" action={addRestore}>
      Retrieve
    </Button>
  );
};

export default Prepare;

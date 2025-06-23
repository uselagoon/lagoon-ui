import React from 'react';

import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import gql from 'graphql-tag';

const addRestore = gql`
  mutation addRestore($input: AddRestoreInput!) {
    addRestore(input: $input) {
      id
    }
  }
`;

const Prepare = ({ backupId }) => {
  const [addRestoreMutation, { loading, called, error }] = useMutation(addRestore, {
    variables: { input: { backupId } },
    onError: e => console.error(e),
  });

  if (error) {
    return <Button disabled>Retrieve failed</Button>;
  }

  if (loading || called) {
    return <Button disabled>Retrieving ...</Button>;
  }
  return (
    <Button testId="retrieve" action={addRestoreMutation}>
      Retrieve
    </Button>
  );
};

export default Prepare;

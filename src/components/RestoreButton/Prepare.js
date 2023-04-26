import React from 'react';
import { Mutation } from 'react-apollo';

import Button from 'components/Button';
import gql from 'graphql-tag';

const addRestore = gql`
  mutation addRestore($input: AddRestoreInput!) {
    addRestore(input: $input) {
      id
    }
  }
`;

const Prepare = ({ backupId }) => (
  <Mutation mutation={addRestore} variables={{ input: { backupId } }}>
    {(addRestore, { loading, called, error, data }) => {
      if (error) {
        return <Button disabled>Retrieve failed</Button>;
      }

      if (loading || called) {
        return <Button disabled>Retrieving ...</Button>;
      }

      return <Button action={addRestore}>Retrieve</Button>;
    }}
  </Mutation>
);

export default Prepare;

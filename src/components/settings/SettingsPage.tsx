'use client';

import addUserSSHPublicKey from '@/lib/mutation/addUserSSHPublicKey';
import deleteUserSSHPublicKey from '@/lib/mutation/deleteUserSSHPublicKey';
import updateUserSSHPublicKey from '@/lib/mutation/updateUserSSHPublicKey';
import Me from '@/lib/query/me';
import { QueryRef, useMutation, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Head2, Table } from '@uselagoon/ui-library';
import { useSession } from 'next-auth/react';

type SshKey = {
  id: number;
  name: string;
  created: string;
  keyType: string;
  keyValue: string;
  keyFingerprint: string;
};

type Me = {
  id: number;
  email: string;
  sshKeys: SshKey[];
};

interface QueryData {
  me: Me;
}

const { SshTable } = Table;

const SettingsPage = ({ queryRef }: { queryRef: QueryRef<QueryData> }) => {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { me },
  } = useReadQuery(queryRef);

  const {data} = useSession()

  const [deleteUserSSHPublicKeyMutation, { data: deleteData, loading: deleteLoading, error: deleteErr }] = useMutation(
    deleteUserSSHPublicKey,
    {
      onError: err => console.error(err),
    }
  );

  const [updateUserSSHPublicKeyMutation, { data: updateData, loading: updateLoading, error: updateErr }] = useMutation(
    updateUserSSHPublicKey,
    {
      onError: err => console.error(err),
    }
  );

  const [addUserSSHPublicKeyMutation, { loading: addLoading, error: addErr }] = useMutation(addUserSSHPublicKey, {
    onError: err => console.error(err),
  });

  const deleteFn = (id: number) => {
    return deleteUserSSHPublicKeyMutation({
      variables: {
        input: {
          id,
        },
      }
    });
  };

  const updateFn = (id: number, keyName: string, keyValue: string) => {
    return updateUserSSHPublicKeyMutation({
      variables: {
        input: {
          id: id,
          patch: {
            name: keyName,
            publicKey: keyValue,
          },
        },
      },
    });
  };

  const addFn = (keyName: string, keyValue: string) => {
    return addUserSSHPublicKeyMutation({
      variables: {
        input: {
          name: keyName,
          publicKey: keyValue,
          user: {
            id: me.id,
            email: me.email,
          },
        },
      },
      refetchQueries: [Me],
    });
  };

  return (
    <>
      <Head2>SSH Keys</Head2>
      <SshTable
        sshKeys={me.sshKeys}
        refetch={refetch}
        deleteKey={{
          delete: deleteFn,
          data: deleteData,
          loading: deleteLoading,
          err: deleteErr,
        }}
        updateKey={{
          update: updateFn,
          data: updateData,
          loading: updateLoading,
          err: updateErr,
        }}
        addNewKey={{
          add: addFn,
          loading: addLoading,
          err: addErr,
        }}
      />
    </>
  );
};

export default SettingsPage;

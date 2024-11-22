'use client';

import { SettingsData } from '@/app/(routegroups)/settings/page';
import addUserSSHPublicKey from '@/lib/mutation/addUserSSHPublicKey';
import deleteUserSSHPublicKey from '@/lib/mutation/deleteUserSSHPublicKey';
import updateUserSSHPublicKey from '@/lib/mutation/updateUserSSHPublicKey';
import Me from '@/lib/query/me';
import { ApolloError, QueryRef, useMutation, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Head2, Table, useNotification } from '@uselagoon/ui-library';

const { SshTable } = Table;

const getPK = (keyType: string, keyValue: string) => {
  return keyType + ' ' + keyValue;
};

const SettingsPage = ({ queryRef }: { queryRef: QueryRef<SettingsData> }) => {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { me },
  } = useReadQuery(queryRef);

  const { contextHolder, trigger } = useNotification({
    type: 'error',
    title: '',
    placement: 'top',
    duration: 0,
    content: null,
  });

  const [deleteUserSSHPublicKeyMutation, { data: deleteData, loading: deleteLoading }] =
    useMutation(deleteUserSSHPublicKey);

  const [updateUserSSHPublicKeyMutation, { data: updateData, loading: updateLoading }] =
    useMutation(updateUserSSHPublicKey);

  const [addUserSSHPublicKeyMutation, { loading: addLoading }] = useMutation(addUserSSHPublicKey, {});

  const deleteFn = async (id: number) => {
    try {
      await deleteUserSSHPublicKeyMutation({
        variables: {
          input: {
            id,
          },
        },
      });
    } catch (err) {
      console.warn(err);
      trigger({ content: (err as ApolloError).message, title: 'There was a problem deleting SSH key' });
    }
  };

  const updateFn = async (id: number, keyName: string, keyType: string, keyValue: string) => {
    try {
      await updateUserSSHPublicKeyMutation({
        variables: {
          input: {
            id: id,
            patch: {
              name: keyName,
              publicKey: getPK(keyType, keyValue),
            },
          },
        },
      });
    } catch (err) {
      console.warn(err);
      trigger({ content: (err as ApolloError).message, title: 'There was a problem updating SSH key' });
    }
  };

  const addFn = async (keyName: string, keyValue: string) => {
    try {
      await addUserSSHPublicKeyMutation({
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
    } catch (err) {
      console.warn(err);
      trigger({ content: (err as ApolloError).message, title: 'There was a problem adding a new SSH key' });
    }
  };

  return (
    <>
      {contextHolder}
      <Head2>SSH Keys</Head2>
      <SshTable
        sshKeys={me.sshKeys}
        refetch={refetch}
        deleteKey={{
          delete: deleteFn,
          data: deleteData,
          loading: deleteLoading,
        }}
        updateKey={{
          update: updateFn,
          data: updateData,
          loading: updateLoading,
        }}
        addNewKey={{
          add: addFn,
          loading: addLoading,
        }}
      />
    </>
  );
};

export default SettingsPage;

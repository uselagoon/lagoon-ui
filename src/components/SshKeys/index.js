import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import Skeleton from 'react-loading-skeleton';

import { Col, Modal, Row, Space, notification } from 'antd';
import Button from 'components/Button';
import DeleteConfirm from 'components/DeleteConfirm';
import DeleteUserSSHPublicKey from 'lib/mutation/DeleteUserSSHPublicKey';
import UpdateUserSSHPublicKey from 'lib/mutation/UpdateUserSSHPublicKey';
import Me from 'lib/query/Me';
import { color } from 'lib/variables';
import moment from 'moment';

import { StyledKeys } from './StyledKeys';

const SshKeys = ({ me: { id, email, sshKeys: keys }, loading, handleRefetch }) => {
  const [isLoading, setIsLoading] = useState(loading);

  const [modalOpen, setModalOpen] = useState(false);

  const [editState, setEditState] = useState({
    id: '',
    name: '',
    publicKey: '',
  });

  const closeModal = () => {
    setEditState({ name: '', publicKey: '' });
    setModalOpen(false);
  };

  const openModal = keyObject => {
    setEditState({ ...keyObject, publicKey: getPK(keyObject) });
    setModalOpen(true);
  };

  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

  const getPK = key => {
    return key.keyType + ' ' + key.keyValue;
  };
  const openNotificationWithIcon = errorMessage => {
    api['error']({
      message: 'There was a problem updating the SSH key.',
      description: errorMessage,
      placement: 'top',
      duration: 0,
      style: { width: '500px' },
    });
  };

  const lastUsedTimeframe = dateTime => {
    if (!dateTime) {
      return 'Never';
    }

    const lastUsed = moment.utc(dateTime).local().format('DD MMM YYYY, HH:mm:ss (Z)');
    const now = moment();
    const dayDiff = now.diff(lastUsed, 'days');

    if (dayDiff === 0) {
      return 'Today';
    } else if (dayDiff === 1) {
      return 'Yesterday';
    } else if (dayDiff < 7) {
      return `${dayDiff} days ago`;
    }

    const weekDiff = now.diff(lastUsed, 'weeks');
    if (weekDiff < 4) {
      return `${weekDiff} week${weekDiff > 1 ? 's' : ''} ago`;
    }

    const monthDiff = now.diff(lastUsed, 'months');
    if (monthDiff < 12) {
      return `${monthDiff} month${monthDiff > 1 ? 's' : ''} ago`;
    }

    const yearDiff = now.diff(lastUsed, 'years');
    return `${yearDiff} year${yearDiff > 1 ? 's' : ''}  ago`;
  };

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <StyledKeys>
      <div className="header">
        <label className="name">Name</label>
        <label className="type">Type</label>
        <label className="fingerprint">Fingerprint</label>
        <label className="created">Created</label>
        <label className="last-used">Last Used</label>
      </div>
      {isLoading ? (
        <Skeleton count={5} height={25} />
      ) : (
        <div className="data-table">
          {!keys?.length && <div className="data-none">No SSH keys</div>}
          {keys &&
            keys.map(key => (
              <div className="data-row" key={key.id} data-cy="data-row">
                <div className="name">
                  {key.id} - {key.name}
                </div>
                <div className="type">{key.keyType}</div>
                <div className="fingerprint">{key.keyFingerprint}</div>
                <div className="created chromatic-ignore">
                  {moment.utc(key.created).local().format('DD MMM YYYY, HH:mm:ss (Z)')}
                </div>
                <div className="last-used chromatic-ignore">{lastUsedTimeframe(key.lastUsed)}</div>

                <Space>
                  <div className="edit" data-cy="editKey">
                    <Button testId="editBtn" action={() => openModal(key)}>
                      Edit
                    </Button>
                    <Modal
                      open={modalOpen && editState.id === key.id}
                      title="Edit SSH Key"
                      onCancel={closeModal}
                      destroyOnClose
                      className="sshmodal"
                      footer={() => (
                        <>
                          <Space>
                            <Mutation mutation={UpdateUserSSHPublicKey} onError={e => console.error(e)}>
                              {(updateUserSSHPublicKey, { loading, called, error, data }) => {
                                if (data) {
                                  handleRefetch();
                                  closeModal();
                                }

                                return (
                                  <>
                                    {contextHolder}
                                    <Button
                                      loading={called || loading}
                                      testId="updateKey"
                                      action={() =>
                                        updateUserSSHPublicKey({
                                          variables: {
                                            input: {
                                              id: key.id,
                                              patch: {
                                                name: editState.name,
                                                publicKey: editState.publicKey,
                                              },
                                            },
                                          },
                                        })
                                      }
                                    >
                                      Update
                                    </Button>
                                    {error && openNotificationWithIcon(error.message)}
                                  </>
                                );
                              }}
                            </Mutation>

                            <Button variant="white" testId="cancelBtn" action={closeModal}>
                              Cancel
                            </Button>
                          </Space>
                        </>
                      )}
                    >
                      <Row>
                        <Col span={24}>SSH KEY NAME:</Col>

                        <Col span={24}>
                          <input
                            className="inputKeyName fullSize"
                            type="text"
                            value={editState.name}
                            onChange={e => {
                              setEditState({ ...editState, name: e.target.value });
                            }}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col span={24}>SSH KEY: </Col>
                        <Col span={24}>
                          <input
                            className="inputKey fullSize"
                            type="text"
                            value={editState.publicKey}
                            onChange={e => {
                              setEditState({ ...editState, publicKey: e.target.value });
                            }}
                          />
                        </Col>
                      </Row>
                    </Modal>
                  </div>

                  <div className="delete" data-cy="deleteKey">
                    <Mutation
                      mutation={DeleteUserSSHPublicKey}
                      refetchQueries={[{ query: Me }]}
                      onError={e => console.error(e)}
                    >
                      {(deleteUserSSHPublicKey, { loading, called, error, data }) => {
                        if (error) {
                          return <div>{error.message}</div>;
                        }

                        const deleteMessage = (
                          <>
                            This action will delete the SSH key{' '}
                            <span style={{ color: color.blue, fontWeight: 'bold' }}>{key.name}</span> and cannot be
                            undone.
                          </>
                        );

                        return (
                          <DeleteConfirm
                            deleteType="SSH Key"
                            deleteMessage={deleteMessage}
                            deleteName={key.name}
                            loading={called}
                            variant="red"
                            onDelete={() =>
                              deleteUserSSHPublicKey({
                                variables: {
                                  input: {
                                    id: key.id,
                                  },
                                },
                              })
                            }
                          />
                        );
                      }}
                    </Mutation>
                  </div>
                </Space>
              </div>
            ))}
        </div>
      )}
    </StyledKeys>
  );
};

export default SshKeys;

import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import Skeleton from 'react-loading-skeleton';

import { Col, Modal, Row, Space } from 'antd';
import Button from 'components/Button';
import DeleteUserSSHPublicKey from 'lib/mutation/DeleteUserSSHPublicKey';
import UpdateUserSSHPublicKey from 'lib/mutation/UpdateUserSshPublicKey';
import Me from 'lib/query/Me';
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
    setEditState(keyObject);
    setModalOpen(true);
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
      </div>
      {isLoading ? (
        <Skeleton count={5} height={25} />
      ) : (
        <div className="data-table">
          {!keys?.length && <div className="data-none">No SSH keys</div>}

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
                                if (error) {
                                  return <div>{error.message}</div>;
                                }

                                if (data) {
                                  handleRefetch();
                                  closeModal();
                                }

                                return (
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

                        return (
                          <Button
                            testId="deleteBtn"
                            loading={called}
                            variant="red"
                            action={() =>
                              deleteUserSSHPublicKey({
                                variables: {
                                  input: {
                                    id: key.id,
                                  },
                                },
                              })
                            }
                          >
                            Delete
                          </Button>
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

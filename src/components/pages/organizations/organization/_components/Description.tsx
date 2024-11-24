import { FC, useState } from 'react';

import { EditOutlined } from '@ant-design/icons';

import { EditDesc } from './EditDesc';
import { EditName } from './EditName';
import { OrgField } from './styles';

interface Props {
  orgId: number;
  name: string;
  description: string;
}

export const Description: FC<Props> = ({ orgId, name, description }) => {
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [descModalOpen, setDescModalOpen] = useState(false);

  const closeNameModal = () => {
    setNameModalOpen(false);
  };

  const closeDescModal = () => {
    setDescModalOpen(false);
  };

  return (
    <>
      <OrgField className="margin">
        <span className="desc">organization name</span>
        <section className="editField">
          <span className="name">
            {name} <EditOutlined className="edit" onClick={() => setNameModalOpen(true)} />
          </span>
        </section>
        <EditName orgId={orgId} orgName={name} modalOpen={nameModalOpen} closeModal={closeNameModal} />
      </OrgField>

      <OrgField>
        <span className="desc">description</span>
        <section className="editField">
          <span className="description">
            {description || ' - '} <EditOutlined className="edit" onClick={() => setDescModalOpen(true)} />
          </span>
        </section>
        <EditDesc orgId={orgId} orgDesc={description} modalOpen={descModalOpen} closeModal={closeDescModal} />
      </OrgField>
    </>
  );
};

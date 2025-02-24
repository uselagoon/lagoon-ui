import { FC, useState } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { LoadingSkeleton } from '@uselagoon/ui-library';

import { EditDesc } from './EditDesc';
import { EditName } from './EditName';
import { OrgField } from './styles';

type DescriptionProps = {
  orgId: number;
  name: string;
  description: string;
  loading?: false;
};
type loadingProps = {
  loading: true;
};

type Props = DescriptionProps | loadingProps;

export const Description: FC<Props> = props => {
  if (props.loading) {
    return (
      <>
        <OrgField className="margin">
          <span className="desc">organization name</span>
          <section className="editField">
            <span className="name">
              <LoadingSkeleton width={100} />
            </span>
          </section>
        </OrgField>

        <OrgField>
          <span className="desc">description</span>
          <section className="editField">
            <span className="description">
              <LoadingSkeleton width={100} />
            </span>
          </section>
        </OrgField>
      </>
    );
  }

  const { orgId, name, description } = props;

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
          <span className="name" data-cy="friendly-name">
            {name} <EditOutlined data-cy="edit-name" className="edit" onClick={() => setNameModalOpen(true)} />
          </span>
        </section>
        <EditName orgId={orgId} orgName={name} modalOpen={nameModalOpen} closeModal={closeNameModal} />
      </OrgField>

      <OrgField>
        <span className="desc">description</span>
        <section className="editField">
          <span className="description" data-cy="org-description">
            {description || ' - '}{' '}
            <EditOutlined data-cy="edit-desc" className="edit" onClick={() => setDescModalOpen(true)} />
          </span>
        </section>
        <EditDesc orgId={orgId} orgDesc={description} modalOpen={descModalOpen} closeModal={closeDescModal} />
      </OrgField>
    </>
  );
};

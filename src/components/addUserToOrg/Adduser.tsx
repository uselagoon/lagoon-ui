import { FC } from 'react';

import { PlusOutlined } from '@ant-design/icons';

import { CreateButton } from '../pages/organizations/organization/_components/styles';

interface Props {}
export const AddUser: FC<Props> = ({}) => {
  return (
    <CreateButton>
      <PlusOutlined className="icon" /> <span className="text">Add user</span>
    </CreateButton>
  );
};

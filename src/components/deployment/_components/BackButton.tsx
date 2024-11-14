import { useRouter } from 'next/navigation';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Text } from '@uselagoon/ui-library';

import { StyledBackButton } from './styles';

const BackButton = () => {
  const router = useRouter();

  return (
    <StyledBackButton onClick={() => router.back()}>
      <ArrowLeftOutlined /> <Text className="text">Back</Text>
    </StyledBackButton>
  );
};

export default BackButton;

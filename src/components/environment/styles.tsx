import { EditOutlined } from '@ant-design/icons';
import { Head3, Text } from '@uselagoon/ui-library';
import styled from 'styled-components';

export const EnvironmentNameLabel = styled(Text)`
  font-family: 'AmericaMono-Regular', sans-serif;
  font-size: 10px !important;
  font-weight: 400;
  line-height: 10px;
  letter-spacing: -0.08em;
  text-align: left;
`;

export const EnvironmentName = styled(Head3)`
  margin-top: 0 !important;
`;
export const EditName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;
  width: max-content;
  margin-bottom: 2.5rem;
`;
export const EditButton = styled(EditOutlined)`
  cursor: pointer;
`;
export const RoutesSection = styled.section`
  margin-top: 2.5rem;
  > *:not(:first-child) {
    margin-bottom: 0.5rem;
  }
`;
export const RoutesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  a {
    color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#000')};
    &:hover {
      text-decoration: underline;
    }
  }
`;
import { Colors } from '@uselagoon/ui-library';
import styled from 'styled-components';

export const EditProjectVariablesButton = styled.div`
  font-size: 0.875rem;
  line-height: 1.375rem;
  max-width: max-content;
  color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '000')};
  font-family: 'ArabicPro-Regular', sans-serif;
  border: 1px solid ${props => props.theme.UI.borders.box};
  padding: 4px 15px;
  box-shadow: 0px 2px 0px 0px #00000004;
  border-radius: 2px;
  cursor: pointer;
  transition: color 0.3s ease, border 0.3s ease;
  background-color: ${props => (props.theme.colorScheme === 'dark' ? '#222222' : '#fafafa')};
  &:hover {
    color: ${Colors.lagoonBlue};
    border: 1px solid ${Colors.lagoonBlue};
  }
`;

export const Space = styled.div`
  margin-block: 2rem;
`;

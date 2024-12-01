import { Colors } from '@uselagoon/ui-library';
import styled from 'styled-components';

export const ConfirmModalWrapper = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 0;
  p {
    color: ${props => props.theme.UI.texts.primary};
    margin-bottom: 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    font-family: 'Open Sans', sans-serif !important;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  *.highlight{
    color: ${Colors.lagoonBlue};
    font-weight: 500;
  }
`;

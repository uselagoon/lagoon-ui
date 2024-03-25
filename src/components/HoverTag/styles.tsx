import styled from 'styled-components';

export const TooltipText = styled.p<{ $maxWidth?: string; $textColor?: string }>`
  margin: unset;
  max-width: ${props => (props.$maxWidth ? props.$maxWidth : '150px')};
  margin: unset;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => (props.$textColor ? props.$textColor : '#fff')};
`;

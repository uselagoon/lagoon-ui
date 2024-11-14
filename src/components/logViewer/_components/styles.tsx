import { Colors } from '@uselagoon/ui-library';
import styled from 'styled-components';

export const StyledScrollableLog = styled.div`
  position: relative;
`;
export const ScrollButton = styled.div`
  position: absolute;
  right: 0;
  transform: translateX(8px);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.cellGray};
  .scroll-icon {
    font-size: 20px;
    color: #fff;
  }
`;

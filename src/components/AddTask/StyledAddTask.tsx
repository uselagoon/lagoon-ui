import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const StyledNewTask = styled.div`
  background: ${color.white};
  border: 1px solid ${color.lightestGrey};
  border-radius: 3px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-flow: column;
  margin-bottom: 32px;
  padding: 32px 20px;
  width: 100%;
  @media ${bp.tabletUp} {
    margin-bottom: 0;
  }
  .selectTask {
    flex-grow: 1;
    min-width: 220px;
  }
  .taskForm {
    margin-top: 20px;
  }
`;

export const NewTaskWrapper = styled.div`
  @media ${bp.wideUp} {
    display: flex;
  }
  &::before {
    @media ${bp.wideUp} {
      content: '';
      display: block;
      flex-grow: 1;
    }
  }
`;

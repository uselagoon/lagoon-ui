import { Colors } from '@uselagoon/ui-library';
import styled from 'styled-components';

export const TasksPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  .selector {
    margin-top: -2rem;
    margin-bottom: 1rem;
  }
`;

export const SelectEnv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40%;
  gap: 0.75rem;
  label {
    font-family: 'ArabicPro-Regular', sans-serif;
  }
  .task-btn {
    width: max-content;
  }
  .warning {
    padding: 0.75rem 1rem;
    background-color: ${Colors.pink};
    border-radius: 0.25rem;
    font-family: 'ArabicPro-Regular', sans-serif;
    font-size: 0.95rem;
  }
`;

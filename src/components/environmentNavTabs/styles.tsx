import { LoadingSkeleton } from '@uselagoon/ui-library';
import { Tag } from 'antd';
import styled from 'styled-components';

export const ProblemCount = styled(Tag)`
  margin-left: 8px;
  border-radius: 100px;
  margin-right: 0;
`;

export const ProblemCountSkeleton = styled(LoadingSkeleton)`
  margin-left: 8px;
  border-radius: 100px;
  margin-right: 8px;
`;

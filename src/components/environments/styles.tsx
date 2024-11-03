import Link from 'next/link';

import styled from 'styled-components';

export const StyledEnvironmentsWrapper = styled.section`
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const LinkContainer = styled(Link)`
  display: flex;
  gap: 0.2rem;
  align-items: center;
`;

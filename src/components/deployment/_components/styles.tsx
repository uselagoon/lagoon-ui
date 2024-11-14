import styled from 'styled-components';

export const Switchers = styled.section`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  > div {
    display: flex;
    gap: 1rem;
  }
`;

export const StyledBackButton = styled.div`
  cursor: pointer;
  margin-bottom: 1.375rem;
  display: flex;
  gap: 4px;
  align-items: center;
  .text {
    font-family: 'ArabicPro-Regular', sans-serif;
    font-size: 1rem;
    line-height: 18px;
    text-decoration-line: underline;
  }
`;

'use client';

import { useEffect } from 'react';

import styled from 'styled-components';

const statusCodes = {
  400: 'Bad Request',
  401: 'Not Authenticated',
  404: 'This page could not be found',
  500: 'Internal Server Error',
  501: 'Not Implemented',
};

type StatusCode = keyof typeof statusCodes;

interface Props {
  statusCode: StatusCode;
  errorMessage: string;
  title?: string;
}

/**
 * Displays an error page, given a status code and optional error message.
 */

const ErrorPage = ({ statusCode, errorMessage, title }: Props) => {
  const ErorrTitle = title || statusCodes[statusCode] || 'An unexpected error has occurred';

  useEffect(() => {
    document.title = `${statusCode}: ${ErorrTitle}`;
  }, [ErorrTitle]);

  return (
    <StyledErrorPage>
      <h2>{ErorrTitle}</h2>
      {errorMessage && <p>{errorMessage}</p>}
    </StyledErrorPage>
  );
};
export default ErrorPage;

const StyledErrorPage = styled.section`
  font-family: 'Source-sans-pro', sans-serif;
  position: fixed;
  top: 76px;
  left: 0;
  background-color: ${props => (props.theme.colorScheme === 'dark' ? '#000' : '#fff')};
  width: 100dvw;
  height: 100dvh;
  display: flex;
  padding-top: 10%;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  h2 {
    font-size: 2rem;
  }
`;

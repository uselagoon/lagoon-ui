import styled from 'styled-components';

export const StyledAccount = styled.div`
  margin: 2rem 0;

  h2 {
    margin-bottom: 2rem;
    color: ${props => props.theme.texts.primary};
    margin: 0;
    text-align: left;
  }
`;

export const AccountForm = styled.form`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  input[type='text'],
  input[type='email'] {
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .error {
    color: red;
    margin: 0.5rem 0;
  }
`;

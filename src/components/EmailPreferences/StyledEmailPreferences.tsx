import styled from 'styled-components';

export const StyledEmailPreferences = styled.div`
  margin: 2rem 0;

  h2 {
    margin-bottom: 2rem;
    color: ${props => props.theme.texts.primary};
    margin: 0;
    text-align: left;
  }
`;

export const EmailForm = styled.form`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem 3rem;
    width: 100%;
  }

  .option {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    font-size: 1rem;
    cursor: pointer;
    text-transform: none;
    color: ${props => props.theme.texts.primary};
  }

  .option-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .option-title {
    font-weight: bold;
    font-size: 1.1rem;
  }

  input[type='checkbox'] {
    accent-color: #1967d2;
    width: 22px;
    height: 22px;
    margin-top: 2px;
  }

  .error {
    color: red;
    margin: 1rem;
    margin-inline: 2rem;
    border: 1px solid hotpink;
    flex-basis: 100%;
  }
`;

import styled from 'styled-components';

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: max-content;
  height: 4.2rem;
  min-width: 30.6875rem;
  margin-bottom: 2rem !important;
  .ant-row.ant-form-item-row {
    flex-direction: column;
    min-width: 30.6875rem !important;
  }
  .ant-col {
    label {
      font-size: 14px;
    }
    text-align: justify !important;
  }
  input {
    max-width: 29.5rem;
  }
  .description {
    font-size: 14px;
  }
  [data-id='copy'] {
    display: flex;
    justify-content: center;
    align-content: center;
    width: max-content;
    padding-block: 0.35rem;
    margin-top: 0.5rem;
    padding-inline: 1rem;
    border: 1px solid ${props => (props.theme.colorScheme === 'dark' ? '#D9D9D9' : '#000')};
    border-radius: 3px;
    max-width: 28rem;
  }
  [data-id='webhook'] {
    display: flex;
    justify-content: space-between;
    align-content: center;
    max-width: 28rem;
    padding-block: 0.35rem;
    margin-top: 0.5rem;
    padding-inline: 1rem;
    border: 1px solid ${props => (props.theme.colorScheme === 'dark' ? '#D9D9D9' : '#000')};
    border-radius: 3px;
    > div {
      width: 100%;
    }
  }
`;

export const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: underline;
    font-size: 1rem;
    line-height: 22px;
    color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : 'initial')};
  }
  > div {
  }
`;

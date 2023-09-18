import styled from "styled-components";

export const StyledErrorModal = styled.div`
  text-align: center;
  .close-modal{
    text-align: right;

    span {
      font-size: 1.5rem;
      color: #dc3545;
    }
  }
  .icon {
    margin-bottom: 0.5rem;
    border: 2px solid #dc3545;
    border-radius: 42px;
    padding: 14px;
    svg {
      font-size: 3rem;
      fill: #dc3545;
    }
  }
  .error-modal{
    margin: 16px 0;
  }
`;

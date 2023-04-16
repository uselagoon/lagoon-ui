import styled from "styled-components";
import { color } from "lib/variables";

export const StyledCustomTaskConfirm = styled.div`
  .margins {
    margin-right: 10px;
  }
  input {
    margin-right: 10px;
    width: 100%;
  }
  .environment-name {
    font-weight: bold;
    color: ${color.lightBlue};
  }
  a.hover-state {
    margin-right: 10px;
    color: ${color.blue};
  }
  .form-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SelectWrapper = styled.div`
  .envSelect {
    margin: 10px 0;
    #dest-env{
    color: black;
    }
  }
  .warning {
    background-color: red;
    color: white;
    padding: 10px;
  }
`;

export const StyledRegisteredTasks = styled.div`
  .envSelect {
    margin: 10px 0;
  }
  .envText {
    display: block;
    margin: 10px 0;
  }
  .envText label {
    display: block;
  }
  .envText input {
    width: 100%;
    margin-bottom: 15px;
    padding: 8px 2px;
    border-color: rgb(204, 204, 204);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
  }
  .warning {
    background-color: red;
    color: white;
    padding: 10px;
  }
`;

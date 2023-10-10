import {color} from 'lib/variables';
import styled from 'styled-components';

export const StyledNewProject = styled.div`
.environment-modal {
  padding-top: 10px;
}

input {
  width: 100%;
  line-height: 1.5rem;
}

.add-project-header {
  font-family: source-code-pro,sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.form-box {
  margin-bottom: 1rem;
}

.docs-link {
  margin: 1.5rem 0;
  border: 1px solid ${props => props.theme.texts.primary};
  padding: 1rem;
  display: flex;
  gap: 12px;
  
  a {
    text-decoration: underline;
    color: ${color.lightBlue};
  }
  .new-project-info {
    width: 100%;
  }
}
`;

export const Checkbox = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
  gap: 8px;
  margin-top: 1.5rem;
  input[type='checkbox'] {
    width: 22px;
    height: 22px;
  }
`;

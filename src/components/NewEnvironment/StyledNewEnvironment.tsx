import { bp, color, fontSize } from 'lib/variables';
import styled from 'styled-components';

export const StyledNewEnvironment = styled.div`
.copy-field {
  display: flex;
  width: fit-content;
  overflow: visible;
  transform: translateX(-13px);
  align-items: center;
}
.field {
  background-color: ${props => props.theme.backgrounds.copy};
  // border-right: 28px solid ${color.white};
  color: ${props => props.theme.texts.primary};
  font-family: 'source-code-pro', sans-serif;
  ${fontSize(13)};
  overflow: hidden;
  padding: 6px 13px 6px 15px;
  position: relative;
  text-overflow: ellipsis;
}

&.skeleton .field {
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
}
.copy {
  background: url('/static/images/copy.svg') center center no-repeat ${props => props.theme.backgrounds.copy};
  background-size: 20px;
  bottom: 0;
  height: 34px;
  position: absolute;
  right: 0;
  width: 40px;
  transition: all 0.5s;

&:hover {
    background-color: ${props => props.theme.backgrounds.sidebar};
    cursor: pointer;
  }
}

.copied {
  background-color: ${props => props.theme.backgrounds.copy};
  ${fontSize(9, 16)};
  border-radius: 3px;
  padding: 0 2px;
  position: absolute;
  right: 0;
  text-transform: uppercase;
  top: 20px;
  transition: top 0.5s, opacity 0.75s ease-in;
}

.showHide {
  width: 70px;
}

.environment-modal {
  padding-top: 10px;
}

input {
  margin-right: 10px;
  width: 100%;
  line-height: 1.5rem;
}

.env-modal-header {
  font-family: source-code-pro,sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.modal-step {
  margin-bottom: 2rem;
}

.guide-links {
  margin: 1rem 0;
  
  button {
    margin-right: 16px;
  }
}
  .loader {
    display: inline-block;
    width: 150px;
    height: 15px;
  }
  .loader:after {
    content: " ";
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 auto;
    text-align: center;
    
    border-radius: 50%;
    border: 2px solid ${color.blue};
    border-color: ${color.blue} transparent ${color.blue} transparent;
    animation: loader 1.2s linear infinite;
  }
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
  `;

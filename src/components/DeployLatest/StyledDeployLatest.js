import { bp, color } from 'lib/variables';
import styled from 'styled-components';

export const NewDeployment = styled.div`
  align-items: center;

  background: ${props =>
    props.theme.colorScheme === 'dark' ? `${props.theme.backgrounds.secondary}` : `${props.theme.backgrounds.primary}`};
  border: 1px solid ${props => props.theme.borders.box};
  border-radius: 3px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 15px;

  @media ${bp.tabletUp} {
    margin-bottom: 0;
  }

  @media ${bp.wideUp} {
    min-width: 52%;
  }

  .description {
    color: ${props => props.theme.texts.description};
  }

  .deploy_result {
    margin-top: 20px;
    text-align: right;
    width: 100%;
  }
  .btn--disabled {
    margin-right: 0;
  }
  .loader {
    display: inline-block;
    width: 50px;
    height: 15px;
  }
  .loader:after {
    content: " ";
    display: block;
    width: 20px;
    height: 20px;
    margin-left: 15px;
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
`;

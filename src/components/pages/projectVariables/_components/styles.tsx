import { Colors, Head2 } from '@uselagoon/ui-library';
import styled from 'styled-components';

export const NewVariableTitle = styled(Head2)`
  font-size: 28px !important;
  line-height: 32px !important;
  margin-bottom: 0 !important;
  margin-top: 1.5rem !important;
`;

export const VariableSteps = styled.span`
  font-size: 10px;
  line-height: 22px;
  font-weight: 400;
  margin-top: -10px;
`;

export const ModalWrapper = styled.div`
  min-height: 300px;
  padding-top: 5.5rem;
  padding-bottom: 6.8125rem;
`;

export const ProjectVariablebutton = styled.div`
  font-size: 0.875rem;
  line-height: 1.375rem;
  transform: translateX(-12px);
  max-width: 170px;
  color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '000')};
  font-family: 'ArabicPro-Regular', sans-serif;
  border: 1px solid ${props => props.theme.UI.borders.box};
  padding: 4px 15px;
  box-shadow: 0px 2px 0px 0px #00000004;
  border-radius: 2px;
  cursor: pointer;
  transition: color 0.3s ease, border 0.3s ease;
  &:hover {
    color: ${Colors.lagoonBlue};
    border: 1px solid ${Colors.lagoonBlue};
  }
`;

export const DeleteVariableButton = styled.div`
  cursor: pointer;
  transition: color 0.3s ease, border 0.3s ease;
  &:hover {
    color: ${Colors.pink};
  }
`;

export const EditVariableButton = styled.div`
  cursor: pointer;
  transition: color 0.3s ease, border 0.3s ease;
  &:hover {
    color: ${Colors.orange};
  }
`;

export const Highlighted = styled.span`
  color: ${Colors.lagoonBlue};
  font-weight: 700;
`;
export const ContentWrapper = styled.div`
  display: flex;
  gap: 2.75rem;
  .ant-form {
    .ant-form-item input {
      width: 100%;
    }
  }
  .inputs {
    flex: 1;
  }
  .explainer {
    max-width: 19.625rem;
    margin-top: 2rem;
  }
`;

export const FormItemWrapper = styled.div`
  .variable-wrap {
    margin-bottom: 2.625rem;
    display: flex;
    flex-direction: column;

    .vertical-form-item {
      .ant-form-item-margin-offset {
        display: none;
      }
      .ant-row {
        display: flex;
        flex-direction: column;
        .ant-form-item-label {
          text-align: left;
        }
        .ant-form-item-additional {
          display: none;
        }
      }
    }
  }
`;

export const ModalSubtitle = styled.span`
  font-size: 10px;
  line-height: 22px;
  font-weight: 400;
  margin-top: -10px;
`;

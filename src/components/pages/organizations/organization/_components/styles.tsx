import { Colors, Head2 } from '@uselagoon/ui-library';
import styled from 'styled-components';

export const OrgField = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.875rem;

  &.margin {
    margin-top: 1.5rem;
  }
  .desc {
    font-family: 'AmericaMono-Regular', sans-serif;
    font-size: 11px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: -0.08em;
    color: ${props => (props.theme.colorScheme === 'dark' ? '#f2f2f280' : '#000')};
    text-transform: uppercase;
  }
  .name,
  .description {
    color: ${props => (props.theme.colorScheme === 'dark' ? '#F8F8F2' : '#000')};
  }
  .name {
    font-family: 'ArabicPro-Regular', sans-serif;
    font-size: 1.5rem;
    line-height: 1.75rem;
  }
  .description {
    font-size: 0.875rem;
    line-height: 1.375rem;
  }
  .editField {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .edit {
    font-size: 17px;
    cursor: pointer;
  }
`;

export const EditModalTitle = styled(Head2)`
  font-size: 28px !important;
  line-height: 32px !important;
  margin-bottom: 0 !important;
  margin-top: 1.5rem !important;
`;

export const EditModalWrapper = styled.div`
  .wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    .ant-form-item {
      .ant-form-item-margin-offset {
        display: none;
      }
      .ant-row {
        display: flex !important;
        flex-direction: column !important;
        .ant-form-item-label {
          text-align: left;
        }
        .ant-form-item-additional {
          display: none;
        }
      }
    }
  }
  .addprojectmodal {
    display: flex;
    gap: 3rem;
    .tip {
      margin-top: 2rem;
    }
  }
  .addprojectfields, .addFields {
    flex: 1;
    width: 55%;

    .ant-form-item input {
      width: 100%;
    }
  }
  .addFields{
    > .wrap {
      margin-bottom: 1.25rem;
    }
  }
`;

export const TipWrapper = styled.div`
  max-width: 300px;
  margin-bottom: 80px;
`;
export const OrgDeployTargets = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
  > div {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    padding-inline: 1.5rem;
    &:not(:last-child) {
      border-right: 1px solid ${props => (props.theme.colorScheme === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.25)')};
    }
  }
`;

export const OrgActionsWrapper = styled.section`
  margin-block: 24px 42px;
  display: flex;
  gap: 24px;
`;

export const CreateButton = styled.button`
  all: unset;
  cursor: pointer;
  border: 1px solid ${props => props.theme.UI.borders.box};
  box-shadow: 0px 2px 0px 0px #00000004;
  padding-inline: 15px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 62px;
  transition: all 0.3s ease;
  > * {
    transition: all 0.3s ease;
  }
  &:hover {
    border: 1px solid ${Colors.lagoonBlue};
    > * {
      color: ${Colors.lagoonBlue};
    }
  }
  .text {
    font-family: 'ArabicPro-Regular', sans-serif;
    font-size: 14px;
    line-height: 22px;
  }
  .icon {
    font-size: 22px;
  }
`;

export const LabelTooltip = styled.div`
  .explainer {
    cursor: pointer;
    margin-left: 0.5rem;
  }
`;

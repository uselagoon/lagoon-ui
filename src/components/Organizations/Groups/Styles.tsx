import { color } from 'lib/variables';
import styled from 'styled-components';

import { sharedTableStyles } from '../SharedStyles';

export const StyledGroups = styled.section`
  width: 95.83%;
  .default-group-label {
    color: ${color.white};
    background-color: ${props => (props.theme.colorScheme === 'dark' ? props.theme.borders.tableRow : color.black)};
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
    font-size: clamp(0.5rem, 0.65vw, 1.2rem);
    text-align: center;
    display: inline-block;
  }
  .remove {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    width: 20%;
  }
  .group {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    width: 50%;
    font-weight: normal;
  }
  .customer {
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    padding: 5px 10px 5px 10px;
    color: ${props => (props.theme.colorScheme === 'dark' ? color.grey : color.darkGrey)};
    width: 30%;
    font-weight: normal;
  }
  .newGroup {
    background: ${color.midGrey};
    padding: 15px;
  }
  .form-box input,
  textarea {
    display: inline-block;
    width: 50%;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    min-height: 38px;
    border-color: hsl(0, 0%, 80%);
    font-family: 'source-code-pro', sans-serif;
    font-size: 0.8125rem;
    color: #5f6f7a;
    padding: 8px;
    box-sizing: border-box;
  }
  input[type='text']:focus {
    border: 2px solid ${color.linkBlue};
    outline: none;
  }
  label {
    padding-left: 20px;
    padding-right: 15px;
  }
  ${sharedTableStyles}

  .description {
    line-height: 24px;
  }
`;

export const GroupsWrapper = styled.div`
  width: 95.83%;
  padding-top: 22px;
  padding-inline: 12px;
  display: flex;
  flex-direction: column;
`;

export const AddGroupButton = styled.button`
  all: unset;
  width: 115px;
  height: 38px;
  margin-top:42px;
  text-align: center;
  cursor: pointer;
  background: #4578e6;
`;

export const DeleteButton = styled.button`
all:unset;
cursor:pointer;
margin-left:auto;
background:#4578E6;
color: #fff;
border-radius:2px;
width:96px;
text-align:center;
transition:all 0.3s ease;
&:hover{
  box-shadow: 4px 8px 13px 0px #00000008;
}
`;

export const CancelButton = styled.button`
all:unset;
cursor:pointer;
border-radius:2px;
border:1px solid #4578E6;
color:#4578E6;
background:#fff;
width:81px;
text-align:center;
transition:all 0.3s ease;
&:hover{
  box-shadow: 4px 8px 13px 0px #00000008;
}
`;

export const ModalFooter = styled.div`
height:40px;
display:flex;
gap:8px;
`;
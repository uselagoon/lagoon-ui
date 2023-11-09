import styled from 'styled-components';

export const StyledTable = styled.div`
  background: ${props => props.theme.backgrounds.secondary};
  box-shadow: 4px 8px 13px 0px #00000008;
`;

export const Filters = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  background: ${props => props.theme.backgrounds.content};
  padding-bottom: 18px !important;
  > * {
    height: 40px !important;
    font-size: 0.95rem !important;
  }
  &:not(:has(input[type='checkbox'])) {
    select {
      margin-left: auto;
    }
  }
  > select {
    min-width: 210px;
    padding: 10px;
  }
  .search {
    > input {
      height: 40px;
      &::placeholder {
        font-size: 0.95rem !important;
      }
    }
    .icon {
      top: 12px;
    }
  }
  .labelText {
    margin-right: auto;
    display: inline-flex;
    align-items: center;
    text-transform: uppercase;
    font-size: 13px !important;
    font-weight: 600;
    color: ${props => (props.theme.colorScheme === 'dark' ? '#fff' : '#5f6f7a')};
  }
`;

export const TableRow = styled.div`
  display: flex;
  transition: 0.3s ease;
  &:not(:last-child) {
    border: 2px solid transparent;
    border-bottom: 2px solid ${props => props.theme.borders.tableRow};
  }
  /* &:hover {
    border: 2px solid #2bc0d8;
  } */
`;
export const TableColumn = styled.div<{ width: string }>`
  &:not(:last-child) {
    border-right: 2px solid ${props => props.theme.borders.tableRow};
  }
  transition: all 0.3s ease;
  padding: 25px 13px;
  height: 61px;
  width: ${props => props.width};
  align-items: center;
  display: flex;
  & > .email{
    word-wrap:break-word;
    word-break:break-all;
  }
  &:last-child {
    justify-content: flex-end;
  }
`;
export const SelectLimit = styled.div`
  span {
    margin-right: 13px;
  }
  select {
    width: 60px;
    height: 30px;
  }
`;

export const TableFooter = styled.div`
  background: ${props => props.theme.backgrounds.content};
  display: flex;
  align-items: center;
  padding: 48px 0 30px;
  height: 2rem;
`;

export const Pagination = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
  > * {
    user-select: none;
    cursor: pointer;
    height: 2rem;
    width: 2rem;
    background: ${props => props.theme.backgrounds.box};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1px 7px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: 0.3s ease;
    &:hover {
      border: 1px solid #4578e6;
    }
    &.active {
      background: #4578e6;
      color: #fff;
    }
  }
`;

export const PreviousBtn = styled.div`
  &.disabled {
    pointer-events: none;
    color: #d9d9d9;
  }
`;
export const NextBtn = styled.div`
  &.disabled {
    pointer-events: none;
    color: #d9d9d9;
  }
`;

export const TableEmpty = styled.p`
  text-align: center;
  padding: 2.5rem;
  background: ${props => props.theme.backgrounds.box};
`;

export const Checkbox = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-right:16px;
  input[type='checkbox'] {
    width: 22px;
    height: 22px;
  }
`;

import styled from 'styled-components';

export const StyledTable = styled.div`
  background: ${props => props.theme.backgrounds.secondary};
  box-shadow: 4px 8px 13px 0px #00000008;
`;

export const Filters = styled.div`
  display: flex;
  gap: 4px;
  align-items:center;
  background: ${props => props.theme.backgrounds.content};
  padding-bottom: 18px !important;
  > * {
    height: 40px !important;
    font-size: 0.95rem !important;
  }
  > select {
    margin-left: auto;
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
`;

export const TableRow = styled.div`
  display: flex;
  transition:0.3s ease;
  &:not(:last-child) {
    border: 2px solid transparent;
    border-bottom: 2px solid ${props => props.theme.borders.tableRow};
  }
  &:hover{
    border:2px solid #2bc0d8;
  }
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
  padding: 30px 0;
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
text-align:center;
padding:2.5rem;
`;
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';

const withInputValue = withState('inputValue', 'setInputValue', '');
const withInputName = withState('inputName', 'setInputName', '');
const withInputScope = withState('inputScope', 'setInputScope', '');
const withInputClear = withState('clear', 'setClear', '');

const withInputHandlers = withHandlers({
  setInputValue:
    ({ setInputValue }) =>
    event =>
      setInputValue(event.target.value),
  setInputName:
    ({ setInputName }) =>
    event =>
      setInputName(event.target.value),
  setClear:
    ({ setInputValue, setInputName, setInputScope }) =>
    () =>
      [setInputValue(''), setInputName(''), setInputScope('')],
});

const withModalState = withState('open', 'setOpen', false);
const withModalHandlers = withHandlers({
  openModal:
    ({ setOpen }) =>
    () =>
      setOpen(true),
  closeModal:
    ({ setOpen }) =>
    () =>
      setOpen(false),
});

export default compose(
  withInputValue,
  withInputName,
  withInputScope,
  withInputClear,
  withInputHandlers,
  withModalState,
  withModalHandlers
);

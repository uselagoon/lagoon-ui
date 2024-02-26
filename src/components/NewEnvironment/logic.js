import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';

const withInputValue = withState('inputBranchName', 'setBranchName', '');
const withInputClear = withState('clear', 'setClear', '');

const withInputHandlers = withHandlers({
  setBranchName:
    ({ setBranchName }) =>
    event =>
      setBranchName(event.target.value),
  setClear:
    ({ setBranchName }) =>
    () =>
      setBranchName(''),
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

export default compose(withInputValue, withInputClear, withInputHandlers, withModalState, withModalHandlers);

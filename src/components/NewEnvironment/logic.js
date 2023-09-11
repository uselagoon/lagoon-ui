import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

const withInputValue = withState('inputBranchName', 'setBranchName', '');
const withInputHandlers = withHandlers({
  setBranchName: ({ setBranchName }) => (event) =>
      setBranchName(event.target.value)
});

const withModalState = withState('open', 'setOpen', false);
const withModalHandlers = withHandlers({
  openModal: ({ setOpen }) => () => setOpen(true),
  closeModal: ({ setOpen }) => () => setOpen(false)
});

export default compose(
    withInputValue,
    withInputHandlers,
    withModalState,
    withModalHandlers
);

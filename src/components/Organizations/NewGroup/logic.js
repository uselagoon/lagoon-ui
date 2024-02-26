import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';

const withInputValue = withState('inputValueGroup', 'setInputValue', '');
const withInputHandlers = withHandlers({
  setInputValue:
    ({ setInputValue }) =>
    event =>
      setInputValue(event.target.value),
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

const withNewMemberHanders = withHandlers({
  onCompleted:
    ({ setSelectedTask }) =>
    () => {
      setSelectedTask('Completed');
    },
  onError:
    ({ setSelectedTask }) =>
    () => {
      setSelectedTask('Error');
    },
});

const withSelectedRole = withState('selectedRole', 'setSelectedRole', null);

export default compose(
  withInputValue,
  withInputHandlers,
  withNewMemberHanders,
  withSelectedRole,
  withModalState,
  withModalHandlers
);

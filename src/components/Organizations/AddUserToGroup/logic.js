import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';

const withInputValue = withState('inputValueEmail', 'setInputValue', '');
const withInputHandlers = withHandlers({
  setInputValue:
    ({ setInputValue }) =>
    event =>
      setInputValue(event.target.value),
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

export default compose(withInputValue, withInputHandlers, withNewMemberHanders, withSelectedRole);

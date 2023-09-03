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

const withCheckboxValue = withState('checkboxValueOwner', 'setCheckboxValueOwner', false);
const withCheckboxhandler = withHandlers({
  setCheckboxValueOwner:
    ({ setCheckboxValueOwner }) =>
    event => {
      setCheckboxValueOwner(event.target.checked);
    },
});

const withSelectedRole = withState('selectedRole', 'setSelectedRole', null);

export default compose(withInputValue, withInputHandlers, withCheckboxValue, withCheckboxhandler, withSelectedRole);

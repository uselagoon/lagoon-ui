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

const withCheckboxValueOwner = withState('checkboxValueOwner', 'setCheckboxValueOwner', false);
const withCheckboxhandlerOwner = withHandlers({
  setCheckboxValueOwner:
    ({ setCheckboxValueOwner }) =>
    event => {
      setCheckboxValueOwner(event.target.checked);
    },
});

const withCheckboxValueAdmin = withState('checkboxValueAdmin', 'setCheckboxValueAdmin', false);

const withCheckboxHandlerAdmin = withHandlers({
  setCheckboxValueAdmin:
    ({ setCheckboxValueAdmin }) =>
    event => {
      setCheckboxValueAdmin(event.target.checked);
    },
});

const withSelectedRole = withState('selectedRole', 'setSelectedRole', null);

export default compose(
  withInputValue,
  withInputHandlers,
  withCheckboxValueOwner,
  withCheckboxhandlerOwner,
  withCheckboxValueAdmin,
  withCheckboxHandlerAdmin,
  withSelectedRole
);

import compose from "recompose/compose";
import withState from "recompose/withState";
import withHandlers from "recompose/withHandlers";

const withInputValue = withState("inputValue", "setInputValue", "");
const withInputName = withState("inputName", "setInputName", "");
const withInputScope = withState("inputScope", "setInputScope", "");
const withInputTarget = withState("inputTarget", "setInputTarget", "");

const withInputHandlers = withHandlers({
  setInputValue: ({ setInputValue }) => (event) =>
    setInputValue(event.target.value),
  setInputName: ({ setInputName }) => (event) =>
    setInputName(event.target.value),
});

const withModalState = withState("open", "setOpen", false);
const withModalHandlers = withHandlers({
  openModal: ({ setOpen }) => () => setOpen(true),
  closeModal: ({ setOpen }) => () => setOpen(false),
});

export default compose(
  withInputValue,
  withInputName,
  withInputScope,
  withInputTarget,
  withInputHandlers,
  withModalState,
  withModalHandlers
);

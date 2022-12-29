import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

const withInputName = withState('inputValueName', 'setInputName', '');
const withInputHandlersName = withHandlers({
  setInputName: ({ setInputName }) => event =>
  setInputName(event.target.value)
});

const withInputChannel = withState('inputValueChannel', 'setInputChannel', '');
const withInputHandlersChannel = withHandlers({
  setInputChannel: ({ setInputChannel }) => event =>
  setInputChannel(event.target.value)
});

const withInputWebhook = withState('inputValueWebhook', 'setInputWebhook', '');
const withInputHandlersWebhook = withHandlers({
  setInputWebhook: ({ setInputWebhook }) => event =>
  setInputWebhook(event.target.value)
});

const withModalState = withState('open', 'setOpen', false);
const withModalHandlers = withHandlers({
  openModal: ({ setOpen }) => () => setOpen(true),
  closeModal: ({ setOpen }) => () => setOpen(false)
});

const withNewMemberHanders = withHandlers({
  onCompleted: ({ setSelectedTask }) => () => {
    setSelectedTask('Completed');
  },
  onError: ({ setSelectedTask }) => () => {
    setSelectedTask('Error');
  }
});

const withSelectedProject = withState('selectedProject', 'setSelectedProject', null);

export default compose(
  withInputName,
  withInputHandlersName,
  withInputChannel,
  withInputHandlersChannel,
  withInputWebhook,
  withInputHandlersWebhook,
  withNewMemberHanders,
  withSelectedProject,
  withModalState,
  withModalHandlers
);

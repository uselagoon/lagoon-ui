import { FC } from 'react';

import { notification } from 'antd';

interface Props {
  error: {
    message: string;
  };
  message: string;
}

const ErrorNotification: FC<Props> = ({ error, message }) => {
  //   const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

  //   const openNotification = () => {
  //     api['error']({
  //       message: message,
  //       description: description,
  //       placement: 'top',
  //       duration: 0,
  //       style: { width: '500px' },
  //     });
  //   };

  //   return (
  //     <>
  //       {contextHolder}

  //       {openNotification()}
  //     </>
  //   );
  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

  const openNotificationWithIcon = (message: string, description: string) => {
    api['error']({
      message: message,
      description: description,
      placement: 'top',
      duration: 0,
      style: { width: '500px' },
    });
  };
  return (
    <>
      {contextHolder}
      {error && openNotificationWithIcon(message, error.message)}
    </>
  );
};

export default ErrorNotification;

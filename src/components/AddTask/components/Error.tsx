import React, { FC, useEffect } from 'react';

import { notification } from 'antd';

interface Props {
  errMessage: string;
}
const Error: FC<Props> = ({ errMessage }) => {
  const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

  const showError = (errorMessage: string) => {
    api['error']({
      message: 'There was a problem running a task.',
      description: errorMessage,
      placement: 'top',
      duration: 0,
      style: { width: '500px' },
    });
  };

  useEffect(() => {
    if (errMessage) showError(errMessage);
  }, [errMessage]);

  return <>{contextHolder}</>;
};
export default Error;

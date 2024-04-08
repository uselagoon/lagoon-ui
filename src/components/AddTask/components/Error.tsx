import React, { FC } from 'react';

interface Props {
  errMessage: string;
}
const Error: FC<Props> = ({ errMessage }) => {
  return <div>{errMessage}</div>;
};
export default Error;

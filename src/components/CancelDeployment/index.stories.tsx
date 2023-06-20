import React from 'react';

import { action } from '@storybook/addon-actions';

import { CancelDeploymentButton as CancelDeployment } from './index';

export default {
  component: CancelDeployment,
  title: 'Components/CancelDeployment',
};

const rest = {
  action: action('button-clicked'),
  success: false,
  loading: false,
  error: false,
};

//@ts-ignore
export const Default = () => <CancelDeployment deployment={{ id: 42 }} {...rest} />;
//@ts-ignore
export const Loading = () => <CancelDeployment deployment={{ id: 42 }} {...rest} loading />;
//@ts-ignore
export const Success = () => <CancelDeployment deployment={{ id: 42 }} {...rest} success />;
//@ts-ignore
export const Error = () => <CancelDeployment deployment={{ id: 42 }} {...rest} error />;

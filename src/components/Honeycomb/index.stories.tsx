import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { ProjectsProblems } from '../../../.storybook/mocks/api';
import Honeycomb from './index';

const meta: Meta<typeof Honeycomb> = {
  component: Honeycomb,
  title: 'Components/Honeycomb',
};

export const Default: StoryObj<typeof Honeycomb> = {
  render: (data, args) => {
    return data && <Honeycomb data={data} filter={{ showCleanProjects: false }} {...args} />;
  },
  args: {
    //@ts-ignore
    projectsProblems: ProjectsProblems(1243),
  },
};

export const NoProjects = () => <Honeycomb data={[]} filter={{ showCleanProjects: false }} />;

export default meta;

import { faker } from '@faker-js/faker';

import { generateEnvironments } from './mocks';

interface Project {
  id: string;
  name: string;
  __typename: 'Project';
  environments: {
    route: string;
    __typename: 'Environment';
  }[];
}

export const MockAllProjects = (seed?: number) => {
  if (seed) {
    faker.seed(seed);
  }

  const numberOfProjects = faker.number.int({ min: 10, max: 20 });

  const allProjects: Project[] = Array.from({ length: numberOfProjects }, () => {
    return {
      id: faker.string.uuid(),
      name: faker.word.words(),
      __typename: 'Project',
      environments: [
        {
          route: faker.internet.url(),
          __typename: 'Environment',
          openshift:{
            friendlyName: faker.word.words(),
            cloudRegion: "NA"
          }
        },
      ],
    };
  });

  return allProjects;
};

export const MockSettings = (seed?: number) => {
  if (seed) {
    faker.seed(seed);
  }

  const me = {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    id: faker.string.uuid(),
    lastName: faker.person.lastName(),
    sshKeys: [
      'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQDU/asJRZkN/qcIF4zipV4x/Za/T5qYr9rjojsMZIp5IejfiChQEgSazl2yYp46WC6YhIk+TA3nepHF5SGKWpJLHdDBetTAlbeb5fcsKui3AF59okyNH2f3ijDsuZjqKPlQL5o8EmeNa2F2YYXWOKwdort6fOXug7NUL7TU2TIJwQ== noname',
    ],
    __typename: 'User',
  };
  return me;
};

export const MockAllDeployments = (seed?: number) => {
  if (seed) {
    faker.seed(seed);
  }
  const numberOfDeployments = faker.number.int({ min: 5, max: 20 });

  // function to create fake environment names with name/like/so or-name-like-so or a long word
  const formattedNameString = () => {
    const format = faker.number.int({ min: 1, max: 3 });
    const projectEnvName = faker.word.words({ count: { min: 2, max: 5 } });

    switch (format) {
      case 1:
        return projectEnvName.replace(/\s/g, '/');
      case 2:
        return projectEnvName.replace(/\s/g, '-');
      case 3:
        return projectEnvName.replace(/\s/g, '');
      default:
        return '';
    }
  };

  const allDeployments = Array.from({ length: numberOfDeployments }, () => {
    return {
      status: faker.helpers.arrayElement(['new', 'pending', 'running', 'cancelled', 'error', 'failed', 'complete']),
      name: faker.lorem.slug({ min: 1, max: 5 }),
      priority: faker.helpers.arrayElement(['critical', 'urgent', 'low']),
      created: faker.date.anytime().toDateString(),
      environment: {
        name: formattedNameString(),
        project: {
          name: faker.lorem.slug({ min: 1, max: 3 }),
        },
        openshift: {
          name: faker.word.words(),
        },
      },
    };
  });
  return allDeployments;
};

export const MockBulkDeployments = (seed?: number) => {
  if (seed) faker.seed(seed);

  const bulkNumber = faker.number.int({ min: 1, max: 10 });

  const bulkDeployments = Array.from({ length: bulkNumber }, () => {
    return {
      id: faker.string.uuid(),
      status: faker.helpers.arrayElement(['new', 'pending', 'running', 'cancelled', 'error', 'failed', 'complete']),
      name: faker.lorem.slug({ min: 1, max: 5 }),
      created: faker.date.past().toDateString(),
      started: faker.date.past().toDateString(),
      completed: faker.date.past().toDateString(),
      buildLog: faker.word.words(),
      bulkId: faker.string.uuid(),
      bulkName: faker.lorem.slug(),
      priority: faker.helpers.arrayElement(['critical', 'urgent', 'low']),
      environment: generateEnvironments(),
    };
  });
  return bulkDeployments;
};

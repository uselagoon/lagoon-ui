import { faker } from '@faker-js/faker';

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
    sshKeys: ["ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQDU/asJRZkN/qcIF4zipV4x/Za/T5qYr9rjojsMZIp5IejfiChQEgSazl2yYp46WC6YhIk+TA3nepHF5SGKWpJLHdDBetTAlbeb5fcsKui3AF59okyNH2f3ijDsuZjqKPlQL5o8EmeNa2F2YYXWOKwdort6fOXug7NUL7TU2TIJwQ== noname"],
    __typename: 'User',
  };
  return me;
};

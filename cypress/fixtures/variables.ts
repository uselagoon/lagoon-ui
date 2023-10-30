export const testData = {
  variables: {
    name: 'Test variable',
    value: '123456789',
  },
  ssh: {
    name: 'Test SSH',
    value:
      'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCqdSQ0y7tT+42qEdPlWniU5IGpBC8zKLq7DozcXSPAIzXVz853wFFOVCOcJSCGw/sF/7DQCgFWEV90uUBTdx0HPG6/i0n6DD92q4wK0tRBvYfBPernQ/iXXQxqO/Gg4b0O76z6PId+/35LoO5qdlfgbcAtn4b/ry9WF8hSar4az2qxgcpRVg4TpvFtvBX/ChxcmFzJRk0yWr4B+qEdLjaqJcobCgqcJoWYoIioUWEttX9Muz36Mst59ibqIDygI1kOGqQ7nf3AAVcMPoy7UdvkGD4lsi/Ibbi/8yRdlCzGoHBmTFV/R71XBg+tgN79ztmsxwap0uH1f/WKZRP4HzAd',
  },
  organizations: {
    overview: {
      friendlyName: 'Friendly test org',
      description: 'Test org description',
    },
    groups: {
      newGroupName: 'group-cy-test-1',
      newGroupName2:"group-cy-test-2",
    },
    users: {
      email: 'davit.darsavelidze+100@amazee.io',
      role: 'developer',
    },
    projects: {
      projectName: 'drupal-example-test-cy',
      gitUrl: 'git@github.com:amazeeio/drupal-example.git',
      prodEnv: 'main',
    },
    notifications: {
      slack: {
        name: 'cy-slack-notification',
        webhook: 'cy-slack-webhook',
        channel: 'cy-slack-channel',
      },
      rocketChat: {
        name: 'cy-rocketChat-notification',
        webhook: 'cy-rocketChat-webhook',
        channel: 'cy-rocketChat-channel',
      },
      email: {
        name: 'cy-email-notification',
        email: 'cy-email',
      },
      teams: {
        name: 'cy-msTeams-notification',
        webhook: 'cy-msTeams-webhook',
      },
      webhook: {
        name: 'cy-webhook-notification',
        webhook: 'cy-webhook',
      },
    },
    manage:{
      user:"davit.darsavelidze+101@amazee.io"
    }
  },
};

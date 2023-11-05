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
      newGroupName: 'cypress-group1',
      newGroupName2: 'cypress-group2',
    },
    users: {
      email: 'davit.darsavelidze+100@amazee.io',
      role: 'developer',
    },
    projects: {
      projectName: 'cy-drupal-test',
      gitUrl: 'git@github.com:amazeeio/drupal-example.git',
      prodEnv: 'main',
    },
    notifications: {
      slack: {
        name: 'cy-slack-notification-1',
        webhook: 'cy-slack-webhook-1',
        channel: 'cy-slack-channel-1',
      },
      rocketChat: {
        name: 'cy-rocketChat-notification-1',
        webhook: 'cy-rocketChat-webhook-1',
        channel: 'cy-rocketChat-channel-1',
      },
      email: {
        name: 'cy-email-notification-1',
        email: 'cy-email-1',
      },
      teams: {
        name: 'cy-msTeams-notification-1',
        webhook: 'cy-msTeams-webhook-1',
      },
      webhook: {
        name: 'cy-webhook-notification-1',
        webhook: 'cy-webhook-1',
      },
    },
    manage: {
      user: 'davit.darsavelidze+101@amazee.io',
    },
  },
};

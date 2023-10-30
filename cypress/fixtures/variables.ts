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
      newGroupName: 'cy-test-first-group',
      newGroupName2: 'cy-test-second-group',
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
        name: 'cy-slack-notification-test',
        webhook: 'cy-slack-webhook-test',
        channel: 'cy-slack-channel-test',
      },
      rocketChat: {
        name: 'cy-rocketChat-notification-test',
        webhook: 'cy-rocketChat-webhook-test',
        channel: 'cy-rocketChat-channel-test',
      },
      email: {
        name: 'cy-email-notification-test',
        email: 'cy-email-test',
      },
      teams: {
        name: 'cy-msTeams-notification-test',
        webhook: 'cy-msTeams-webhook-test',
      },
      webhook: {
        name: 'cy-webhook-notification-test',
        webhook: 'cy-webhook-test',
      },
    },
    manage: {
      user: 'davit.darsavelidze+101@amazee.io',
    },
  },
};

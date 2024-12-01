export const transformNotifications = (notificationsArray: any[])=>{
    return notificationsArray.reduce((acc, { name, type }) => {
      let key: string;
      switch (type) {
        case 'SLACK':
          key = 'slacks';
          break;
        case 'WEBHOOK':
          key = 'webhooks';
          break;
        case 'ROCKETCHAT':
          key = 'rocketChats';
          break;
        case 'EMAIL':
          key = 'emails';
          break;
        case 'MICROSOFTTEAMS':
          key = 'teams';
          break;
        default:
          return acc;
      }
  
      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push({ name, type });
  
      return acc;
    }, {} as Record<string, { name: string; type: string }[]>);
  }
import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

import { DashboardIcon } from './DashboardIcon';

/**
 * A place where svgs get turned into custom antd icons
 */

export const IconDashboard = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DashboardIcon} {...props} />
);

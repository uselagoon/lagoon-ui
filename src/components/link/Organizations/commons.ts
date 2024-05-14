import { ReactNode } from 'react';

export interface ExtendableOrgLinkProps {
  organizationSlug: string;
  organizationId: number;
  children: ReactNode;
  className?: string | null;
  prefetch?: boolean;
  orgFriendlyName?: string;
}

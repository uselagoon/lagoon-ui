'use client';

import Link from 'next/link';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Colors, Head2, Text } from '@uselagoon/ui-library';
import styled from 'styled-components';

export default function KeyCloakPage({ kcUrl }: { kcUrl: string }) {
  return (
    <>
      <Head2>KeyCloak</Head2>
      <StyledText>
        Your security identity is managed by KeyCloak, click on the button below to manage your password, two factor
        authentication and single sign on settings.
      </StyledText>

      <div></div>

      <Link target="_blank" href={`${kcUrl}/account`} key="account" data-cy="account">
        <StyledBtn>
          <PlusOutlined />
          Access KeyCloak
        </StyledBtn>
      </Link>
    </>
  );
}

const StyledText = styled(Text)`
  font-size: 14px !important;
`;

const StyledBtn = styled(Button)`
  padding: 25px 15px !important;
  border-radius: 0 !important;
  border: 1px solid ${props => props.theme.UI.borders.box};
  color: ${props => props.theme.UI.texts.primary} !important;
  background-color: ${props => (props.theme.colorScheme === 'dark' ? '#222222' : '#fafafa')} !important;
  margin-top: 2.5rem;
  &:hover {
    color: ${Colors.lagoonBlue} !important;
  }
`;

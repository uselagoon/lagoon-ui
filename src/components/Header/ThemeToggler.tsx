import { useContext } from 'react';

import Image from 'next/image';

import { color } from 'lib/variables';
import styled from 'styled-components';

import { AppContext } from '../../pages/_app';

type AppContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeToggler = () => {
  const { theme, toggleTheme } = useContext(AppContext) as unknown as AppContextType;

  return (
    <StyledToggler onClick={toggleTheme}>
      <Image
        alt="toggle"
        height={35}
        width={35}
        src={`${theme === 'dark' ? '/static/images/sun.svg' : '/static/images/moon.svg'}`}
      />
    </StyledToggler>
  );
};
export default ThemeToggler;

const StyledToggler = styled.span`
  display: inline-flex;
  margin-left: auto;
  margin-right: 16px;
  align-self: center;
  align-items: center;
  padding: 6px;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  border-radius: 8px;
  height: max-content;
  &:hover {
    background-color: ${color.lightestBlue};
  }
  &:active {
    background-color: ${color.lightBlue};
    border: 2px solid ${color.lightestBlue};
  }
`;

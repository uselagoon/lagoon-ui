import { color } from "lib/variables";
import Image from "next/image";
import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../pages/_app";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <StyledToggler>
      <Image
        onClick={toggleTheme}
        alt="toggle"
        height={28}
        width={28}
        src={`${
          theme === "dark"
            ? "/static/images/sun.svg"
            : "/static/images/moon.svg"
        }`}
      />
    </StyledToggler>
  );
};
export default ThemeToggler;

const StyledToggler = styled.span`
  display: inline-flex;
  margin-left: auto;
  margin-right: 16px;
  align-self: stretch;
  align-items: center;
  padding-inline: 12px;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  &:active {
    background-color: ${color.lightBlue};
  }
`;

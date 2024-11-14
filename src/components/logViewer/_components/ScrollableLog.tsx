import { ReactNode, useEffect, useRef, useState } from 'react';

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

import { ScrollButton, StyledScrollableLog } from './styles';

interface Props {
  children: ReactNode;
}

const ScrollableLog: React.FC<Props> = ({ children }) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const logsTopRef = useRef<HTMLDivElement | null>(null);
  const logsEndRef = useRef<HTMLDivElement | null>(null);

  const [showButtons, setShowButtons] = useState<boolean>(false);

  useEffect(() => {
    const checkHeight = () => {
      if (parentRef.current && parentRef.current.clientHeight >= 600) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);

    return () => {
      window.removeEventListener('resize', checkHeight);
    };
  }, []);

  const scrollToTop = () => {
    logsTopRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    logsEndRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  return (
    <StyledScrollableLog ref={parentRef}>
      {showButtons && (
        <ScrollButton ref={logsTopRef} style={{ top: 0 }}>
          <ArrowDownOutlined className="scroll-icon" onClick={scrollToBottom} />
        </ScrollButton>
      )}

      {children}
      {showButtons && (
        <ScrollButton ref={logsEndRef} style={{ bottom: 0 }}>
          <ArrowUpOutlined className="scroll-icon" onClick={scrollToTop} />
        </ScrollButton>
      )}
    </StyledScrollableLog>
  );
};

export default ScrollableLog;

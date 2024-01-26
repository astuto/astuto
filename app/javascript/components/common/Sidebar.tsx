import * as React from 'react';
import { useEffect, useState } from 'react';
import StickyBox from 'react-sticky-box';

// Sidebar uses react-sticky-box to handle sidebar higher than screen height
// However, in mobile view we fallback to a normal div with class 'sidebar' (we don't want the sticky behaviour on mobile)
// Note: using react-sticky-box v1.0.2 as >v2.0 returns jsx-runtime error (https://github.com/codecks-io/react-sticky-box/issues/87)

interface Props {
  children: React.ReactNode;
}

const BOOTSTRAP_BREAKPOINT_SM = 768;

const Sidebar = ({ children }: Props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < BOOTSTRAP_BREAKPOINT_SM);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BOOTSTRAP_BREAKPOINT_SM);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    isMobile ? 
      <div className="sidebar">
        {children}
      </div>
    :
      <StickyBox offsetTop={79} offsetBottom={16} className="sidebar">
        {children}
      </StickyBox>
  );
};

export default Sidebar;
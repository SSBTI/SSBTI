import React, { useState, useLayoutEffect } from 'react';

function CheckIsMobile() {
  const [isMobile, setMobile] = useState<boolean>(false);

  useLayoutEffect(() => {
    const handleWidth = () => {
      if(window.innerWidth < 500)
        setMobile(true);
      else
        setMobile(false);
    }

    handleWidth();

    window.addEventListener('resize', handleWidth);

    return () => window.removeEventListener('resize', handleWidth);
  }, []);

  return isMobile;
}

export default CheckIsMobile;
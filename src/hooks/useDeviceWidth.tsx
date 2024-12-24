import { useState, useEffect } from 'react';

export function useDeviceWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Set the initial width
    setWidth(window.innerWidth);

    // Update width on window resize
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
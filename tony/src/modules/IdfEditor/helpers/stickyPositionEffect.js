import { useState, useEffect } from 'react';

export default function stickyPositionEffect(container) {
  const [stickyPosition, setStickyPosition] = useState(false);

  function onScroll(event) {
    const pos = event.target.scrollLeft;
    if (pos) {
      setStickyPosition(pos);
    } else {
      setStickyPosition(null);
    }
  }

  useEffect(() => {
    if (container && container.current) {
      container.current.addEventListener('scroll', onScroll);
      return () => {
        if(container.current) {
          container.current.removeEventListener('scroll', onScroll);
        }
      }
    }
  }, [container]);

  return stickyPosition;
}

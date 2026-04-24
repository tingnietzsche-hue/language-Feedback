import { motion, useInView } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

export default function Counter({ value, duration = 1 }: { value: string | number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const target = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;
  const isString = typeof value === 'string';

  useEffect(() => {
    if (isInView && !isNaN(target)) {
      let start = 0;
      const end = target;
      const totalFrames = duration * 60;
      const increment = end / totalFrames;
      
      let currentFrame = 0;
      const timer = setInterval(() => {
        currentFrame++;
        start += increment;
        if (currentFrame >= totalFrames) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  const formattedValue = isString ? value.replace(/[0-9]+/, count.toLocaleString()) : count.toLocaleString();

  return <span ref={ref}>{formattedValue}</span>;
}

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeoutRef = useRef<number | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 15, mass: 1 };
  const lightSpringConfig = { stiffness: 150, damping: 30 };
  
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  
  const lightX = useSpring(cursorX, lightSpringConfig);
  const lightY = useSpring(cursorY, lightSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      setIsMoving(true);
      if (moveTimeoutRef.current) window.clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = window.setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (moveTimeoutRef.current) window.clearTimeout(moveTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[5] mix-blend-screen opacity-20"
        style={{
          x: lightX,
          y: lightY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 70%)',
        }}
        animate={{
          scale: isMoving ? 1.2 : 1,
          opacity: isMoving ? 0.3 : 0.15,
        }}
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            rotate: isMoving ? [0, 90, 180, 270, 360] : 0,
            opacity: isMoving ? [1, 0.4, 1, 0.6, 1] : 1,
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 2, ease: 'linear' },
            opacity: { repeat: isMoving ? Infinity : 0, duration: 0.1 },
            scale: { type: 'spring', stiffness: 300, damping: 20 }
          }}
          className="relative flex items-center justify-center"
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          >
            <path 
              d="M16 0C16 8.83656 19.1634 16 28 16C19.1634 16 16 23.1634 16 32C16 23.1634 12.8366 16 4 16C12.8366 16 16 8.83656 16 0Z" 
              fill="white"
            />
          </svg>
          
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute w-1 h-1 bg-white rounded-full blur-[2px]"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;

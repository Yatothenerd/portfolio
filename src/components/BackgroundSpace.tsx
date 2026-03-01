import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const InteractiveBlob: React.FC<{ 
  color: string; 
  size: string; 
  mass: number; 
  stiffness: number; 
  damping: number;
  opacity?: number;
}> = ({ color, size, mass, stiffness, damping, opacity = 0.15 }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { mass, stiffness, damping });
  const springY = useSpring(mouseY, { mass, stiffness, damping });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none blur-[140px] mix-blend-screen"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        opacity,
      }}
    />
  );
};

const BackgroundSpace: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      <InteractiveBlob 
        color="#ffffff" 
        size="45vw" 
        mass={0.5} 
        stiffness={200} 
        damping={40} 
        opacity={0.1}
      />
      
      <InteractiveBlob 
        color="#DC143C" 
        size="55vw" 
        mass={2} 
        stiffness={50} 
        damping={30} 
        opacity={0.08}
      />

      <InteractiveBlob 
        color="#3f3f46" 
        size="70vw" 
        mass={5} 
        stiffness={30} 
        damping={50} 
        opacity={0.15}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,0)_0%,rgba(0,0,0,1)_100%)]" />
      
      <motion.div 
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 w-full h-[30vh] bg-gradient-to-b from-transparent via-white/[0.02] to-transparent z-[1]"
      />

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100% 10vh' 
        }} />
      </div>
    </div>
  );
};

export default BackgroundSpace;

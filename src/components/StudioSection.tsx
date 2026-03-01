import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const StudioImage: React.FC<{ src: string; className?: string; speed?: number }> = ({ src, className, speed = 0.1 }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 500]);

  return (
    <motion.div 
      style={{ y }}
      initial={{ filter: 'grayscale(1)', opacity: 0.8 }}
      whileHover={{ filter: 'grayscale(0)', opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={`rounded-sm overflow-hidden cursor-crosshair bg-zinc-800 ${className}`}
    >
      <img src={src} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </motion.div>
  );
};

const StudioSection: React.FC = () => {
  return (
    <section id="studio" className="py-48 px-10 md:px-20 bg-zinc-900/10 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 font-bold">About the Studio</h2>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-8xl font-serif italic leading-[0.9] tracking-tighter"
            >
              We define the <br />
              <span className="not-italic text-white">future</span> of the <br />
              digital world.
            </motion.h3>
          </div>
          <div className="space-y-6 text-zinc-400 text-xl font-light leading-relaxed max-w-xl">
            <p>
              Active Theory is an independent creative studio that creates high-end interactive experiences for the web, mixed reality, and physical installations.
            </p>
            <p className="text-zinc-500 text-sm">
              By leveraging our custom in-house technology, we push the boundaries of what's possible in real-time performance and artistic expression.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 border border-zinc-700 hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase text-xs tracking-[0.4em] font-bold"
          >
            Learn More About Us
          </motion.button>
        </div>
        
        <div className="grid grid-cols-2 gap-6 relative">
          <div className="space-y-6">
            <StudioImage src="https://picsum.photos/seed/studio1/400/600" className="h-80" speed={-0.1} />
            <StudioImage src="https://picsum.photos/seed/studio2/400/600" className="h-56" speed={0.05} />
          </div>
          <div className="space-y-6 pt-20">
            <StudioImage src="https://picsum.photos/seed/studio3/400/600" className="h-56" speed={-0.05} />
            <StudioImage src="https://picsum.photos/seed/studio4/400/600" className="h-80" speed={0.1} />
          </div>
          {/* Decorative element */}
          <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 border-r border-b border-white/5" />
        </div>
      </div>
    </section>
  );
};

export default StudioSection;

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import StudioSection from './components/StudioSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import LabAI from './components/LabAI';
import BackToTop from './components/BackToTop';
import BackgroundSpace from './components/BackgroundSpace';
import UnderMaintenanceSection from './components/UnderMaintenanceSection';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // ProgressBar spring
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Marquee transform
  const springProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const marqueeX = useTransform(springProgress, [0, 1], [0, -1000]);

  return (
    <div className="relative selection:bg-none min-h-screen bg-black">
      {/* Global Background Layer */}
      <BackgroundSpace />
      
      {/* Overlay Textures */}
      <div className="grain-overlay" />
      
      <CustomCursor />
      <BackToTop />
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#DC143C] origin-left z-[110]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="select-none relative z-10">
        {/* Under Maintenance Section */}
        <UnderMaintenanceSection />

        {/* <Hero /> */}
        
        {/* <ProjectGrid /> */}

        {/* Dynamic Separator */}
        {/* <section className="py-12 overflow-hidden border-y border-zinc-900/50 bg-black/20 backdrop-blur-sm">
          <motion.div 
            style={{ x: marqueeX }}
            className="whitespace-nowrap flex gap-12"
          >
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} className="text-[10vw] font-serif font-bold uppercase tracking-tighter opacity-10 select-none">
                AESTHETICS THROUGH TECHNOLOGY  HIGH END DIGITAL \u00a0
              </span>
            ))}
          </motion.div>
        </section> */}

        {/* <StudioSection /> */}
        
        {/* <section id="labs" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-6 mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </motion.div>
              <h2 className="text-sm uppercase tracking-[0.5em] text-zinc-500 font-bold">Research & Development</h2>
              <h3 className="text-5xl md:text-7xl font-serif max-w-4xl">
                Exploring the <span className="italic">unseen</span> dimensions of tech.
              </h3>
            </div>
            
            <LabAI />
          </div>
        </section> 
        */}

        {/* <ContactSection /> */}

      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default App;

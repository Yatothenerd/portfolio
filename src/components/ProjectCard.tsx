import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, ArrowUpRight, Minus, MousePointer2, Scan, PenTool, Play, Image as ImageIcon } from 'lucide-react';
import { Project } from '../common/types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const modalVariants: Variants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    visible: { 
      opacity: 1, 
      backdropFilter: 'blur(40px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
      opacity: 0, 
      backdropFilter: 'blur(0px)',
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <>
      <motion.div 
        ref={cardRef}
        layoutId={`card-container-${project.id}`}
        onClick={() => setIsOpen(true)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        initial="initial"
        whileHover="hover"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative cursor-pointer group rounded-lg overflow-hidden bg-zinc-900/50 border border-white/5 interactive transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.03)]"
      >
        <div className="aspect-[16/10] overflow-hidden relative bg-black">
          {/* Static Image Base */}
          <motion.img 
            variants={{
              initial: { scale: 1.05, filter: 'grayscale(0.8) brightness(0.5)' },
              hover: { scale: 1, filter: 'grayscale(0.2) brightness(0.7)' }
            }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />

          {/* Video Preview on Hover */}
          {project.video && (
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 z-10"
                >
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>
              )}
            </AnimatePresence>
          )}
          
          <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
            <motion.div 
              variants={{ initial: { opacity: 0.4 }, hover: { opacity: 1 } }}
              className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-pulse" />
              <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-zinc-300">
                {project.video ? 'Motion' : 'Active'}
              </span>
            </motion.div>
          </div>

          <div className="absolute top-6 right-6 z-20">
             <motion.div 
                variants={{ initial: { rotate: 0, scale: 0.8 }, hover: { rotate: 45, scale: 1 } }}
                className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10"
             >
                <ArrowUpRight className="w-4 h-4 text-white" />
             </motion.div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <motion.h4 
              variants={{
                initial: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
                hover: { opacity: 1, scale: 1, filter: 'blur(0px)' }
              }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif text-white tracking-tighter text-center px-12"
            >
              {project.title}
            </motion.h4>
          </div>
        </div>

        <div className="px-6 py-5 flex justify-between items-center bg-black/80 backdrop-blur-xl border-t border-white/5 relative z-20">
           <div className="flex gap-6 items-center">
              <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-500 uppercase">{project.year}</span>
              <div className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold">{project.category}</span>
           </div>
           {project.video ? (
             <Play className="w-3 h-3 text-[#DC143C] opacity-0 group-hover:opacity-100 transition-opacity fill-current" />
           ) : (
             <Scan className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
           )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[2000] bg-black/95 selection:bg-white selection:text-black overflow-hidden"
          >
            <div 
              ref={scrollContainerRef}
              className="absolute inset-0 overflow-y-auto custom-scrollbar"
            >
              {/* Top Navigation - Top Left Close Button */}
              <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-[2100] mix-blend-difference pointer-events-none">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase font-bold pointer-events-auto"
                >
                  <div className="p-4 bg-white/5 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <X className="w-5 h-5" />
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">Close Case</span>
                </button>
                
                <div className="text-right pointer-events-auto">
                  <div className="flex items-center gap-3 justify-end">
                    <div className="w-2 h-2 rounded-full bg-[#DC143C] animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.6em] text-zinc-400 uppercase">Project State: ACTIVE</span>
                  </div>
                  <span className="text-[8px] font-mono text-zinc-600 block mt-1 tracking-widest uppercase">Encryption Status: Secure // {project.id}</span>
                </div>
              </nav>

              <div className="relative min-h-screen">
                {/* Immersive Header - HIGHER OPACITY for visibility */}
                <section className="h-[95vh] flex flex-col justify-end p-8 md:p-24 relative overflow-hidden bg-black">
                  <div className="absolute inset-0 z-0 opacity-60">
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <motion.img 
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        src={project.image} 
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>

                  <motion.div initial="hidden" animate="visible" className="relative z-10 space-y-10 max-w-6xl">
                    <motion.div variants={fadeInUp} className="flex items-center gap-4 text-[#DC143C]">
                      <Minus className="w-8" />
                      <span className="text-[11px] uppercase tracking-[0.6em] font-bold">{project.category}</span>
                    </motion.div>
                    
                    <motion.h1 
                      variants={fadeInUp}
                      className="text-6xl md:text-[11vw] font-serif font-bold leading-[0.8] tracking-tighter"
                    >
                      {project.title.split(' ')[0]}<br />
                      <span className="italic font-normal text-zinc-500">{project.title.split(' ').slice(1).join(' ')}</span>
                    </motion.h1>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
                      <div className="space-y-2">
                        <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500">Year</p>
                        <p className="text-lg font-mono">{project.year}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500">Region</p>
                        <p className="text-lg font-serif italic">Global</p>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500">Core Focus</p>
                        <p className="text-lg italic font-serif">{project.tags.join(', ')}</p>
                      </div>
                    </div>
                  </motion.div>
                </section>

                <section className="py-48 px-8 md:px-24 bg-black relative">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    <div className="lg:col-span-7 space-y-24">
                      {/* Concept Overview & Primary Image */}
                      <div className="space-y-16">
                        <div className="space-y-8">
                          <h2 className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 font-bold">Concept Overview</h2>
                          <p className="text-3xl md:text-5xl font-serif italic leading-[1.2] text-zinc-200">
                            {project.description}
                          </p>
                        </div>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          className="aspect-video w-full overflow-hidden rounded-lg bg-zinc-900 border border-white/5"
                        >
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </motion.div>
                      </div>

                      {/* Gallery / Artifacts Section */}
                      {project.gallery && (
                        <div className="space-y-12 border-t border-white/5 pt-12">
                          <div className="flex items-center gap-4">
                            <ImageIcon className="w-5 h-5 text-[#DC143C]" />
                            <h3 className="text-[10px] uppercase tracking-[0.6em] text-white font-bold">Project Artifacts</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.gallery.map((img, idx) => (
                              <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="aspect-[4/3] rounded-lg overflow-hidden bg-zinc-900 border border-white/5 group/artifact"
                              >
                                <img 
                                  src={img} 
                                  alt={`Gallery ${idx}`} 
                                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover/artifact:grayscale-0 group-hover/artifact:scale-105" 
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tool Design Section */}
                      <div className="space-y-12 border-t border-white/5 pt-12">
                        <div className="flex items-center gap-4">
                           <PenTool className="w-5 h-5 text-[#DC143C]" />
                           <h3 className="text-[10px] uppercase tracking-[0.6em] text-white font-bold">Tool Design & Execution</h3>
                        </div>
                        <div className="flex flex-wrap gap-4">
                           {project.tools.map((tool, idx) => (
                             <motion.div 
                               key={tool}
                               initial={{ opacity: 0, scale: 0.9 }}
                               whileInView={{ opacity: 1, scale: 1 }}
                               transition={{ delay: idx * 0.1 }}
                               className="px-6 py-4 bg-zinc-950/50 border border-white/5 rounded-lg flex flex-col gap-2 min-w-[140px]"
                             >
                               <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Component_{idx + 1}</span>
                               <span className="text-xs font-mono text-white tracking-widest">{tool}</span>
                             </motion.div>
                           ))}
                        </div>
                        <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xl">
                          The architectural backbone of this project relies on a bespoke combination of these design tools, 
                          synchronizing visual high-fidelity with real-time performance metrics.
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-5 sticky top-32">
                      <div className="p-12 bg-zinc-950/50 rounded-lg border border-white/5 space-y-10">
                        <h3 className="text-[10px] uppercase tracking-[0.6em] text-white font-bold">Technical Specifications</h3>
                        <div className="space-y-6">
                           {project.tags.map(tag => (
                             <div key={tag} className="flex justify-between items-center group/spec">
                               <span className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase">{tag}</span>
                               <div className="flex-grow mx-4 border-t border-white/5 group-hover/spec:border-white/20 transition-colors" />
                               <span className="text-[10px] text-white tracking-[0.3em]">VALIDATED</span>
                             </div>
                           ))}
                        </div>
                        <button className="w-full py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.6em] hover:bg-[#DC143C] hover:text-white transition-all transform active:scale-95">
                          Initiate Experience
                        </button>
                        <div className="pt-4 text-center">
                          <span className="text-[8px] font-mono text-zinc-700 tracking-[0.4em] uppercase">Security Level: High_Tier</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="py-64 px-8 md:px-24 border-t border-white/5 bg-zinc-950 flex flex-col items-center justify-center text-center">
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="space-y-16">
                    <div className="space-y-6">
                      <MousePointer2 className="w-6 h-6 text-[#DC143C] mx-auto animate-bounce" />
                      <p className="text-[10px] uppercase tracking-[0.8em] text-zinc-500">EndOfContent_Uplink</p>
                    </div>
                    
                    <button onClick={() => setIsOpen(false)} className="group relative">
                      <h2 className="text-6xl md:text-[10vw] font-serif font-bold italic tracking-tighter text-zinc-800 group-hover:text-white transition-all duration-700">
                        EXIT CASE
                      </h2>
                      <div className="absolute -bottom-4 left-0 w-0 h-[1px] bg-[#DC143C] group-hover:w-full transition-all duration-500" />
                    </button>
                    
                    <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-600">
                      OR PRESS <kbd className="text-white px-2 py-1 border border-white/20 rounded font-mono">ESC</kbd> TO RETURN
                    </p>
                  </motion.div>
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;

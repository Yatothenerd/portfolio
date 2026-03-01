
import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../constants';

const ProjectGrid: React.FC = () => {
  return (
    <section id="projects" className="py-48 px-10 md:px-20 max-w-[1600px] mx-auto min-h-screen">
      <div className="mb-40 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-6">
             <div className="w-12 h-[1px] bg-[#DC143C]" />
             <h2 className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 font-bold">Selected Works</h2>
          </div>
          <h3 className="text-7xl md:text-[9vw] font-serif leading-[0.8] tracking-tighter">
            Selected <br />
            <span className="italic text-zinc-500 font-normal">Projects</span>
          </h3>
        </div>
        <div className="max-w-xs space-y-6">
           <p className="text-zinc-500 text-[11px] uppercase tracking-[0.3em] leading-relaxed font-medium text-right border-r border-[#DC143C]/40 pr-8">
            A study of interaction, light, and the boundaries of digital surface.
          </p>
          <div className="flex justify-end">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Grid: 2 columns, slightly reduced gaps to prevent "oversized" feel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-24">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 1.2, 
              delay: idx * 0.1,
              ease: [0.16, 1, 0.3, 1] 
            }}
            // Subtle offset instead of massive margin
            className={idx % 2 === 1 ? 'md:mt-32' : ''} 
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;

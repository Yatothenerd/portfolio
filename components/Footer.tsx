
import React from 'react';
import { motion } from 'framer-motion';

const SocialLink: React.FC<{ label: string; href: string }> = ({ label, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover="hover"
    initial="initial"
    className="relative text-zinc-500 font-mono text-xs tracking-widest cursor-pointer block"
  >
    <motion.span
      variants={{
        initial: { y: 0, color: '#71717a' },
        hover: { y: -4, color: '#ffffff' }
      }}
      className="inline-block"
    >
      {label}
    </motion.span>
    <motion.span
      variants={{
        initial: { scaleX: 0 },
        hover: { scaleX: 1 }
      }}
      transition={{ duration: 0.3, ease: "circOut" }}
      className="absolute -bottom-1 left-0 w-full h-[1px] bg-white origin-left"
    />
  </motion.a>
);

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-32 px-10 md:px-20 border-t border-zinc-900/50">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-20">
        <div className="space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-[10rem] font-serif font-bold tracking-tighter leading-none"
          >
            HAVE A <span className="italic text-zinc-400">PROJECT?</span>
          </motion.h2>
          
          <motion.a 
            href="mailto:hello@yatogallery.com" 
            whileHover={{ scale: 1.05 }}
            className="inline-block text-2xl md:text-5xl font-light hover:italic underline decoration-1 underline-offset-8 decoration-zinc-800 hover:decoration-white transition-all duration-500"
          >
            hello@yatogallery.com
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full pt-20 border-t border-zinc-900/50">
          <div className="space-y-6 text-center md:text-left">
            <p className="text-zinc-600 uppercase tracking-[0.5em] text-[10px] font-bold">Location</p>
            <p className="text-zinc-400 text-sm leading-loose">
              Phnom Penh, Cambodia<br />
              <span className="opacity-50">11.5564° N, 104.9282° E</span>
            </p>
          </div>
          
          <div className="space-y-6 text-center md:text-right">
            <p className="text-zinc-600 uppercase tracking-[0.5em] text-[10px] font-bold">Social</p>
            <div className="flex justify-center md:justify-end gap-10">
              <SocialLink label="TW" href="#" />
              <SocialLink label="IG" href="#" />
              <SocialLink label="LI" href="#" />
              <SocialLink label="BE" href="#" />
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row justify-between items-center w-full text-zinc-600 text-[9px] uppercase tracking-[0.4em] font-medium opacity-50">
          <span>&copy; {new Date().getFullYear()} YATO GALLERY</span>
          <span className="hidden md:inline-block">—</span>
          <span>Aesthetics Through Technology</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

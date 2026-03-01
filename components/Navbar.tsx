
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const FONTS = [
  "'Playfair Display', serif",
  "'Inter', sans-serif",
  "'Dancing Script', cursive",
  "monospace",
  "serif",
  "sans-serif",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-monospace"
];

const RandomFontLink: React.FC<{ label: string; href: string; delay: number; onClick: () => void }> = ({ label, href, delay, onClick }) => {
  const [currentFont, setCurrentFont] = useState(FONTS[0]);
  const intervalRef = useRef<number | null>(null);

  const startGlitch = () => {
    // 120ms is 2x faster than the previous 240ms
    intervalRef.current = window.setInterval(() => {
      const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)];
      setCurrentFont(randomFont);
    }, 120);
  };

  const stopGlitch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentFont(FONTS[0]);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.a
      href={href}
      onClick={onClick}
      onMouseEnter={startGlitch}
      onMouseLeave={stopGlitch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      style={{ fontFamily: currentFont }}
      className="text-5xl md:text-7xl transition-[font-family] duration-100 select-none cursor-pointer"
    >
      {label}
    </motion.a>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[70] p-6 flex justify-between items-center mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter cursor-pointer uppercase"
        >
          Sun Tropicwathna
        </motion.div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-[80]"
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[60] bg-zinc-950 flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item, idx) => (
              <RandomFontLink
                key={item.label}
                label={item.label}
                href={item.href}
                delay={idx * 0.1}
                onClick={() => setIsOpen(false)}
              />
            ))}
            
            <div className="absolute bottom-12 flex gap-8 text-sm uppercase tracking-widest text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Staggered Letter Reveal for Hero Title
    if (titleRef.current) {
      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = '';
      
      const words = ['SUN', 'TROPICWATHNA'];
      
      titleRef.current.innerHTML = words.map((word, wIdx) => {
        const letters = word.split('').map(char => `<span class="letter inline-block">${char}</span>`).join('');
        return `<div class="line overflow-hidden ${wIdx === 1 ? 'italic translate-x-[5vw] md:translate-x-[10vw]' : ''}">${letters}</div>`;
      }).join('<br />');

      anime.timeline({ loop: false })
        .add({
          targets: '.letter',
          translateY: [100, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 1400,
          delay: (el, i) => 300 + 30 * i
        });
    }

    // 2. Background Grid Ripple using Anime.js Stagger
    if (gridRef.current) {
      const cols = Math.ceil(window.innerWidth / 50);
      const rows = Math.ceil(window.innerHeight / 50);
      const numItems = cols * rows;
      
      gridRef.current.innerHTML = '';
      for (let i = 0; i < numItems; i++) {
        const div = document.createElement('div');
        div.className = 'grid-item';
        gridRef.current.appendChild(div);
      }

      anime({
        targets: '.grid-item',
        scale: [
          {value: 0.1, easing: 'easeOutSine', duration: 500},
          {value: 1, easing: 'easeInOutQuad', duration: 1200}
        ],
        delay: anime.stagger(200, {grid: [cols, rows], from: 'center'}),
        opacity: [0, 0.2],
        loop: false
      });
      
      anime({
        targets: '.grid-item',
        backgroundColor: [
          {value: 'rgba(255,255,255,0)', duration: 0},
          {value: 'rgba(255,255,255,0.05)', duration: 2000},
          {value: 'rgba(255,255,255,0)', duration: 2000}
        ],
        delay: anime.stagger(100, {grid: [cols, rows], from: 'center'}),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
      });
    }
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center px-10 md:px-20 overflow-hidden">
      {/* Anime.js Background Grid */}
      <div ref={gridRef} className="grid-container" />

      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-8 space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-[1px] bg-[#DC143C]" />
            <p className="text-[10px] uppercase tracking-[0.8em] text-zinc-500 font-bold">
              Creative Designer | Digital Artist
            </p>
          </motion.div>
          
          <div className="relative">
            <h1 ref={titleRef} className="text-5xl md:text-[9rem] font-serif font-bold leading-[0.8] tracking-tighter glass-text">
              SUN<br />TROPICWATHNA
            </h1>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: 0,
                y: [0, -12, 0]
              }}
              transition={{ 
                opacity: { delay: 1.5, duration: 1 },
                scale: { delay: 1.5, duration: 1 },
                x: { delay: 1.5, duration: 1 },
                y: { repeat: Infinity, duration: 5, ease: 'easeInOut' }
              }}
              className="font-script text-3xl md:text-6xl text-[#DC143C] absolute top-[10%] left-[70%] md:left-[65%] pointer-events-none whitespace-nowrap drop-shadow-[0_0_40px_rgba(220,20,60,0.8)] z-20"
            >
              a.k.a Yato
            </motion.div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-end pb-12 lg:pb-24 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="space-y-6 border-l border-zinc-800 pl-8"
          >
            <p className="text-zinc-400 text-sm leading-relaxed font-light max-w-xs">
              Crafting high-end digital experiences that bridge the gap between technology and human emotion.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-[#DC143C] animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-600">Available for projects</span>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-16 left-10 right-10 flex justify-between items-end text-[10px] uppercase tracking-[0.5em] text-zinc-500 z-10"
      >
        <div className="space-y-3 font-mono">
          <p>Phnom Penh — Cambodia</p>
          <p className="opacity-40">11.5564° N, 104.9282° E</p>
        </div>
        <div className="flex flex-col items-end gap-6">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-zinc-800" />
          <p className="opacity-60">Experience the Flow</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

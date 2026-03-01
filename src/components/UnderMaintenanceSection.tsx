import React from 'react';
import { motion } from 'framer-motion';

const UnderMaintenanceSection: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#DC143C]/40 via-transparent to-indigo-500/30 blur-3xl" />
      </div>

      {/* Outer frame */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 w-full max-w-4xl rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-2xl px-8 py-12 md:px-16 md:py-16 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
      >
        <div className="mb-8 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-zinc-500">
          <span className="inline-flex h-6 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4">
            <span className="h-2 w-2 rounded-full bg-[#DC143C] animate-pulse" />
            <span className="font-semibold">System Notice</span>
          </span>
          <span className="hidden text-zinc-600 md:inline">Live build is currently being updated</span>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {/* Text block */}
          <div className="space-y-6 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
            >
              Portfolio in
              <span className="ml-3 bg-gradient-to-r from-[#DC143C] via-pink-500 to-indigo-400 bg-clip-text text-transparent">
                Maintenance Mode
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="max-w-xl text-sm md:text-base text-zinc-400 leading-relaxed mx-auto md:mx-0"
            >
              I&apos;m currently rebuilding parts of this experience&mdash;refining visuals,
              polishing interactions, and shipping new work. While I&apos;m in the lab,
              sections of the site are temporarily offline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex flex-col items-center gap-4 pt-4 text-xs uppercase tracking-[0.25em] text-zinc-500 md:flex-row md:items-center"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-10 bg-zinc-700" />
                <span>Expected relaunch: Soon</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600">
                <span className="h-1 w-1 rounded-full bg-zinc-500" />
                <span>Thank you for your patience</span>
              </div>
            </motion.div>
          </div>

          {/* Image / avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 80, damping: 12 }}
            className="relative flex items-center justify-center"
          >
         <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="relative flex flex-col items-center"
            >
              <img
                src="/Image/photo/ME.png"
                alt="Under maintenance illustration"
                className="h-[450px] w-auto rounded-2xl md:h-[550px]"
              />

              <div className="flex items-center justify-between gap-3 text-[10px] text-zinc-400">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Deploy in progress</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                  v2.0 build
                </span>
              </div>
            </motion.div>   
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default UnderMaintenanceSection;

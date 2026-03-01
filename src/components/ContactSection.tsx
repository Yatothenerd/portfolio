import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  return (
    <section id="contact" className="py-48 px-10 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-16">
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-[1px] bg-[#DC143C]" />
              <h2 className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 font-bold">Get in Touch</h2>
            </div>
            <h3 className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tighter">
              Let's build <br />
              <span className="italic text-zinc-500 font-normal">something</span> <br />
              extraordinary.
            </h3>
          </div>

          <div className="space-y-12">
            <div className="flex items-start gap-8">
              <div className="p-4 rounded-full border border-zinc-800">
                <Mail className="w-5 h-5 text-zinc-500" />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Email</p>
                <a href="mailto:hello@yato.gallery" className="text-2xl font-light hover:text-[#DC143C] transition-colors">
                  hello@yato.gallery
                </a>
              </div>
            </div>

            <div className="flex items-start gap-8">
              <div className="p-4 rounded-full border border-zinc-800">
                <MapPin className="w-5 h-5 text-zinc-500" />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Location</p>
                <p className="text-2xl font-light">
                  Phnom Penh, Cambodia
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="prism-glass p-12 rounded-2xl prism-border relative">
          <form className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-transparent border-b border-zinc-800 py-4 focus:border-[#DC143C] outline-none transition-colors font-light text-xl placeholder:text-zinc-800"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-transparent border-b border-zinc-800 py-4 focus:border-[#DC143C] outline-none transition-colors font-light text-xl placeholder:text-zinc-800"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Your Message</label>
              <textarea 
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full bg-transparent border-b border-zinc-800 py-4 focus:border-[#DC143C] outline-none transition-colors font-light text-xl placeholder:text-zinc-800 resize-none"
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 bg-white text-black uppercase text-xs tracking-[0.5em] font-bold flex items-center justify-center gap-4 group"
            >
              Send Message
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </form>
        </div>
      </div>

      {/* Decorative background text */}
      <div className="absolute -bottom-20 -right-20 text-[20vw] font-serif font-bold opacity-[0.02] select-none pointer-events-none whitespace-nowrap">
        CONTACT US
      </div>
    </section>
  );
};

export default ContactSection;

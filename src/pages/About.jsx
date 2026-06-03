import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function About() {
  return (
    <div className="w-full min-h-screen pb-32">
      <section className="pt-32 pb-20 px-6 max-w-3xl mx-auto text-center">
        <motion.h1 
          initial="hidden" animate="visible" variants={fadeIn}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
        >
          About
        </motion.h1>
      </section>

      <section className="max-w-3xl mx-auto px-6">
        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
          className="p-8 md:p-12 rounded-3xl bg-zinc-950 border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
          <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-8">Founder</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-medium mb-1">Ishaan Malik</h3>
              <p className="text-accent font-medium">Founder</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-secondary font-medium">
                PGDM, SPJIMR
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-secondary font-medium">
                Strategy Consultant
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-secondary font-medium">
                Ex-Private Equity
              </span>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-lg font-light leading-relaxed">
                Exploring the future of AI coworkers and human-machine collaboration.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

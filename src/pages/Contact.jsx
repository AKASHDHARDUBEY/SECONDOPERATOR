import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Contact() {
  return (
    <div className="w-full min-h-screen pb-32">
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <motion.h1 
          initial="hidden" animate="visible" variants={fadeIn}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Building. Experimenting. <br className="hidden md:block"/>
          <span className="text-accent">Learning.</span>
        </motion.h1>
      </section>

      <section className="max-w-xl mx-auto px-6">
        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
          className="p-10 md:p-14 rounded-3xl bg-zinc-950 border border-white/5 text-center shadow-xl"
        >
          <div className="space-y-10">
            <div>
              <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-3">Reach us</h2>
              <a 
                href="mailto:reachishaanmalik@gmail.com" 
                className="text-2xl md:text-3xl font-semibold hover:text-accent transition-colors block text-white"
              >
                reachishaanmalik@gmail.com
              </a>
            </div>

            <div className="pt-4 border-t border-white/5">
              <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-3">Domain</h2>
              <p className="text-xl text-white font-medium">
                secondoperator.in
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

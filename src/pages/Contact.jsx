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
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
        >
          Building. Experimenting. <br className="hidden md:block"/>
          <span className="text-accent">Learning.</span>
        </motion.h1>
      </section>

      <section className="max-w-xl mx-auto px-6">
        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
          className="p-8 md:p-12 rounded-3xl bg-zinc-950 border border-white/5 text-center"
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-2">Reach us</h2>
              <a 
                href="mailto:reachishaanmalik@gmail.com" 
                className="text-xl md:text-2xl font-medium hover:text-accent transition-colors"
              >
                reachishaanmalik@gmail.com
              </a>
            </div>

            <div>
              <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-2">Domain</h2>
              <p className="text-lg text-white/80 font-light">
                secondoperator.in
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

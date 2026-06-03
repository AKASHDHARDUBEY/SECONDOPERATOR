import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-50" />
        <div className="max-w-4xl mx-auto px-6 text-center z-10">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Every human deserves a <br className="hidden md:block"/>
            <span className="text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-400">
              Second Operator.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-xl text-secondary mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            AI coworkers that handle repetitive work so humans can focus on thinking, creating and deciding.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/about" className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-colors duration-300 w-full sm:w-auto">
              Explore Our Mission
            </Link>
            <Link to="/labs" className="px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto">
              View Experiments
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
            <h2 className="text-3xl md:text-5xl font-semibold mb-12 tracking-tight">Let humans be humans.<br/>Let machines do the work.</h2>
            <div className="space-y-6 text-lg text-secondary font-light max-w-2xl mx-auto">
              <p>Humans should focus on creativity, judgment and relationships.</p>
              <p>Machines should focus on execution, information processing and repetitive workflows.</p>
              <p className="text-white font-medium mt-8">We believe the future belongs to teams where humans and AI work together.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-6">
            <h3 className="text-sm font-semibold tracking-widest text-accent uppercase">Mission</h3>
            <p className="text-2xl font-medium leading-tight">To help people spend less time on repetitive work and more time on what matters.</p>
            <div className="text-secondary space-y-4 font-light">
              <p>We believe technology should amplify human potential rather than replace it.</p>
              <p>Our mission is to create AI coworkers that augment human capability and unlock new levels of productivity.</p>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }} className="space-y-6">
            <h3 className="text-sm font-semibold tracking-widest text-accent uppercase">Vision</h3>
            <p className="text-2xl font-medium leading-tight">A future where every individual has access to a digital workforce.</p>
            <div className="text-secondary space-y-4 font-light">
              <p>Just as every company today has access to software, every human should have access to AI coworkers that help them think, execute and learn.</p>
              <p>Every human deserves a Second Operator.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Explorations */}
      <section className="py-32 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-3xl md:text-4xl font-semibold mb-16 tracking-tight">Current Explorations</motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: "Research Copilot", desc: "Market mapping, competitor tracking and information gathering." },
              { title: "Operations Copilot", desc: "Workflow automation and repetitive business processes." },
              { title: "Analyst Copilot", desc: "Data collection, structuring and reporting." },
              { title: "Decision Support Copilot", desc: "Turning information into actionable recommendations." },
              { title: "Agent Workflows", desc: "AI systems capable of executing real-world tasks under human supervision.", colSpan: "lg:col-span-2" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeIn}
                className={`p-8 rounded-2xl bg-black border border-white/10 hover:border-accent/50 transition-colors duration-500 group ${item.colSpan || ''}`}
              >
                <h3 className="text-xl font-medium mb-4 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-secondary font-light">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Approach (Timeline) */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">Our Approach</h2>
            <div className="text-secondary font-light text-lg space-y-2">
              <p>We believe the best systems are not fully autonomous.</p>
              <p>Humans provide context, judgment and direction. AI provides scale, speed and execution.</p>
            </div>
          </motion.div>
          
          <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0">
            {[
              "Observe real work",
              "Identify repetitive tasks",
              "Test AI capabilities",
              "Keep humans in control"
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="mb-12 relative pl-8 md:pl-12 last:mb-0"
              >
                <div className="absolute left-[-5px] md:left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-black" />
                <h3 className="text-xl font-medium">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

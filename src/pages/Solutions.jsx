import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const solutions = [
  {
    title: "Research Copilot",
    problem: "Hours spent manually scraping data, reading reports, and tracking competitors.",
    workflow: "Automated data aggregation → Information extraction → Synthesis & reporting",
    outcome: "Comprehensive market maps and competitor intelligence delivered in minutes."
  },
  {
    title: "Operations Copilot",
    problem: "Repetitive data entry, invoice processing, and manual coordination across tools.",
    workflow: "Trigger event → AI processing & routing → Action execution",
    outcome: "Zero-touch execution of standard operating procedures."
  },
  {
    title: "Analyst Copilot",
    problem: "Scattered data requiring manual structuring before analysis can even begin.",
    workflow: "Data ingestion → Cleansing & formatting → Statistical summarization",
    outcome: "Clean, structured datasets ready for human insight."
  },
  {
    title: "Founder Copilot",
    problem: "Context switching between managing team, tracking metrics, and strategic planning.",
    workflow: "Email/Slack summarization → Metric tracking → Schedule optimization",
    outcome: "High-level visibility and prioritized focus."
  },
  {
    title: "Decision Support Copilot",
    problem: "Information overload leading to decision fatigue or delayed action.",
    workflow: "Synthesize variables → Present scenarios → Highlight trade-offs",
    outcome: "Clear, actionable recommendations backed by data."
  }
];

export default function Solutions() {
  return (
    <div className="w-full min-h-screen pb-32">
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <motion.h1 
          initial="hidden" animate="visible" variants={fadeIn}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          What can an AI coworker <br className="hidden md:block"/>
          <span className="text-accent">do today?</span>
        </motion.h1>
        <motion.p 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
          className="text-xl text-secondary font-light"
        >
          Real-world workflows. Real experiments. Real results.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((solution, idx) => (
            <motion.div 
              key={idx}
              variants={fadeIn}
              className="p-8 rounded-2xl bg-zinc-950 border border-white/5 hover:border-accent/30 transition-all duration-500 group flex flex-col h-full"
            >
              <h3 className="text-2xl font-medium mb-8 group-hover:text-accent transition-colors">{solution.title}</h3>
              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-2">Problem</h4>
                  <p className="text-sm font-light leading-relaxed">{solution.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-2">Workflow</h4>
                  <p className="text-sm font-light leading-relaxed">{solution.workflow}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-2">Expected Outcome</h4>
                  <p className="text-sm font-light leading-relaxed text-white">{solution.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

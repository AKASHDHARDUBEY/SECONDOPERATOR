import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Labs() {
  return (
    <div className="w-full min-h-screen pb-32">
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <motion.h1 
          initial="hidden" animate="visible" variants={fadeIn}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Second Operator <span className="text-accent">Labs</span>
        </motion.h1>
        <motion.p 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
          className="text-xl text-secondary font-light"
        >
          Exploring the future of human-AI collaboration through real-world experiments.
        </motion.p>
      </section>

      <section className="max-w-4xl mx-auto px-6 space-y-12">
        {/* Experiment #1 */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.4 }}
          className="p-8 md:p-12 rounded-3xl bg-zinc-950 border border-white/10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8">
            <span className="px-3 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full border border-accent/30">
              In Progress
            </span>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-2">Experiment #1</h2>
            <h3 className="text-2xl md:text-3xl font-medium">Chocolate Market Mapping Agent</h3>
          </div>

          <div className="space-y-10">
            <div>
              <h4 className="text-sm font-medium mb-3 text-white">Problem</h4>
              <p className="text-secondary font-light text-sm mb-4">
                Collect SKU-level chocolate pricing data across Blinkit, Zepto and Instamart.
              </p>
              <div className="text-sm font-light text-secondary">
                <p className="mb-2 text-white/70">Manual process involves:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Product discovery</li>
                  <li>Data extraction</li>
                  <li>Price tracking</li>
                  <li>Classification</li>
                  <li>Spreadsheet population</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 text-white">Goal</h4>
              <p className="text-secondary font-light text-sm mb-4">
                Evaluate whether existing AI agents can autonomously:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-sm font-light text-secondary">
                <li>Browse websites</li>
                <li>Extract product information</li>
                <li>Classify products</li>
                <li>Populate spreadsheets</li>
                <li>Accept human corrections</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 text-white">Workflow</h4>
              <div className="grid md:grid-cols-2 gap-8 text-sm font-light text-secondary">
                <div>
                  <p className="text-white/70 mb-2">Brands tracked:</p>
                  <ul className="space-y-1">
                    <li>Mondelez (Cadbury Dairy Milk, Silk, Toblerone)</li>
                    <li>Nestlé (KitKat, Munch, Milkybar)</li>
                    <li>Mars (Snickers, Twix, Mars, Bounty)</li>
                    <li>Ferrero (Ferrero Rocher, Kinder Joy, Kinder Bueno)</li>
                    <li>Lindt (Lindor, Excellence)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/70 mb-2">Outputs generated:</p>
                  <p className="mb-4">Product Name • MRP • ASP • Weight • Link</p>
                  <p className="text-white/70 mb-2">Classifications:</p>
                  <p>Wafer • Milk Chocolate • Dark Chocolate • Pralines • Gift Boxes</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-black border border-white/5">
              <h4 className="text-sm font-medium mb-3 text-white flex items-center">
                <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
                Human-in-the-loop Example
              </h4>
              <div className="space-y-4 text-sm font-light">
                <div className="flex">
                  <span className="text-secondary w-20 flex-shrink-0">Human:</span>
                  <span>"This belongs in Dark Chocolate."</span>
                </div>
                <div className="flex">
                  <span className="text-accent w-20 flex-shrink-0">Agent:</span>
                  <span>Updates classification and learns rule.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h4 className="text-sm font-medium mb-2 text-white">Key Question</h4>
              <p className="text-accent text-lg font-light">
                Can an AI coworker complete a consulting-style research workflow with minimal human intervention?
              </p>
            </div>
          </div>
        </motion.div>

        {/* Placeholders */}
        <div className="grid md:grid-cols-2 gap-6">
          {[2, 3].map((num) => (
            <motion.div 
              key={num}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="p-8 rounded-2xl border border-white/5 border-dashed flex flex-col items-center justify-center min-h-[200px] text-secondary opacity-50 hover:opacity-100 transition-opacity"
            >
              <h3 className="text-sm font-medium mb-2">Experiment #{num}</h3>
              <p className="text-xs tracking-widest uppercase">Coming Soon</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

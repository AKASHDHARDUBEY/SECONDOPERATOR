import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AutomationForm from '../components/AutomationForm';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Home() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  // Drag-to-scroll states for Explorations
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Viewport Scroll tracking for Landing Page animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll Transforms for floating gradient background orbs
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const orb1X = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const orb1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 0.9]);

  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const orb2X = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const orb2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 1.1]);

  // Parallax translation for the grid background
  const gridY = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);

  // Parallax fade/scale for Hero Section
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0px", "100px"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.96]);

  // Horizontal scroll tracking
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
      }
    }
  };

  // Mouse Drag Events
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const slide = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const amount = clientWidth * 0.6;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - amount : scrollLeft + amount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden bg-black">
      {/* Scroll Progress Bar at the top of the viewport */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Dynamic, responsive floating background orbs */}
      <motion.div 
        style={{ y: orb1Y, x: orb1X, scale: orb1Scale }}
        className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/10 blur-[130px] pointer-events-none z-0"
      />
      <motion.div 
        style={{ y: orb2Y, x: orb2X, scale: orb2Scale }}
        className="absolute bottom-[30%] left-[-15%] w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none z-0"
      />

      {/* Parallax Grid Background */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"
      />

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-50 pointer-events-none" />
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="max-w-4xl mx-auto px-6 text-center z-10"
        >
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
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-black border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-semibold mb-12 tracking-tight leading-tight">
              Let humans be humans.<br />
              <span className="text-secondary font-light">Let machines do the work.</span>
            </h2>
            <div className="space-y-6 text-lg text-secondary font-light max-w-2xl mx-auto">
              <p>Humans should focus on creativity, judgment and relationships.</p>
              <p>Machines should focus on execution, information processing and repetitive workflows.</p>
              <p className="text-white font-medium mt-8">We believe the future belongs to teams where humans and AI work together.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 border-t border-white/5 relative z-10">
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

      {/* Current Explorations (Scrollable Carousel) */}
      <section className="py-32 bg-zinc-950/60 backdrop-blur-sm border-t border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <motion.h2 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeIn} 
              className="text-3xl md:text-4xl font-semibold tracking-tight"
            >
              Current Explorations
            </motion.h2>

            {/* Slider Controls */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => slide('left')}
                className="p-3 rounded-full border border-white/10 hover:border-white/20 bg-black text-secondary hover:text-white transition-all cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => slide('right')}
                className="p-3 rounded-full border border-white/10 hover:border-white/20 bg-black text-secondary hover:text-white transition-all cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          {/* Scrollable Track Wrapper with side fading masks */}
          <div className="relative w-full">
            {/* Fade overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-black to-transparent pointer-events-none z-20 opacity-30 md:opacity-50" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-20 opacity-30 md:opacity-50" />

            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing select-none px-2`}
            >
              {[
                { title: "Research Copilot", desc: "Market mapping, competitor tracking and information gathering." },
                { title: "Operations Copilot", desc: "Workflow automation and repetitive business processes." },
                { title: "Analyst Copilot", desc: "Data collection, structuring and reporting." },
                { title: "Decision Support Copilot", desc: "Turning information into actionable recommendations." },
                { title: "Agent Workflows", desc: "AI systems capable of executing real-world tasks under human supervision." }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex-shrink-0 w-[280px] md:w-[360px] snap-start"
                >
                  <div className="p-8 h-[220px] rounded-2xl bg-black border border-white/10 hover:border-accent/40 transition-all duration-500 group flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-medium mb-4 group-hover:text-accent transition-colors">{item.title}</h3>
                      <p className="text-secondary font-light text-sm md:text-base leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="w-6 h-[2px] bg-accent/20 group-hover:w-12 group-hover:bg-accent transition-all duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minimalist Horizontal Scroll Tracker Line */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full mx-auto mt-10 relative">
            <div 
              className="absolute top-0 bottom-0 left-0 bg-accent rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress * 100}%`, left: 0 }}
            />
          </div>
        </div>
      </section>

      {/* Our Approach (Timeline) */}
      <section className="py-32 border-t border-white/5 relative z-10">
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

      {/* Workflow Automation Pitch & Form Section */}
      <AutomationForm />
    </div>
  );
}

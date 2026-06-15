import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, User, Mail, Phone, FileText, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

/*
GOOGLE APPS SCRIPT FOR GOOGLE SHEETS STORAGE (Copy & Paste in Apps Script):

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.description || '',
      data.method || 'Text'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/

// Optional Webhook URL (Replace this with deployed Google Apps Script URL)
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxcFDvEewAe4j6FRgOJK6XN4-XSpsH6pCC2loWvPl19g-mZ0g9FsfpH3DAV8qbLCGwx/exec';

export default function AutomationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });

  const [isListening, setIsListening] = useState(false);
  const [speechSupported] = useState(() => {
    const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    return !!SpeechRecognition;
  });
  const recognitionRef = useRef(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [useVoiceMethod, setUseVoiceMethod] = useState(false);

  // For visualizer effect during voice recording
  const [audioLevel, setAudioLevel] = useState([12, 12, 12, 12, 12]);
  const animationRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onstart = () => {
      setIsListening(true);
      setUseVoiceMethod(true);
      setStatusMessage('Listening... Speak now.');
    };

    rec.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setStatusMessage('Microphone access denied. Please enable permission.');
      } else {
        setStatusMessage(`Error: ${event.error}. Try again.`);
      }
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
      setStatusMessage('');
      setAudioLevel([12, 12, 12, 12, 12]);
    };

    rec.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      if (finalTranscript) {
        setFormData(prev => ({
          ...prev,
          description: prev.description + finalTranscript
        }));
      }
    };

    recognitionRef.current = rec;

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  // Audio level visualizer effect
  useEffect(() => {
    let active = true;
    const runVisualizer = () => {
      if (!active) return;
      setAudioLevel(Array.from({ length: 5 }, () => Math.floor(Math.random() * 28) + 8));
      animationRef.current = requestAnimationFrame(runVisualizer);
    };

    if (isListening) {
      runVisualizer();
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      active = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isListening]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setStatusMessage('Requesting microphone permission...');
      recognitionRef.current.start();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      method: useVoiceMethod ? 'Voice + Text' : 'Text',
      timestamp: new Date().toISOString()
    };

    try {
      if (WEBHOOK_URL) {
        // Submit to Google Sheets via Apps Script Webhook URL
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(payload)
        });
      } else {
        // Fallback simulation (localStorage logging)
        console.log('No WEBHOOK_URL configured. Submission simulation payload:', payload);
        const currentSubmissions = JSON.parse(localStorage.getItem('automation_submissions') || '[]');
        currentSubmissions.push(payload);
        localStorage.setItem('automation_submissions', JSON.stringify(currentSubmissions));
        
        // Sleep to simulate network request latency
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', description: '' });
      setUseVoiceMethod(false);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Dynamic Background Glow behind the form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Have a workflow <br className="hidden sm:block" />
            you would like to be <span className="text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-blue-400">automated?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-secondary font-light max-w-2xl mx-auto"
          >
            We will explore it for free. Give us the details of your repetitive tasks, and our engineers will research and build an automated design plan for you.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-12 rounded-3xl bg-zinc-950/60 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-secondary flex items-center gap-2">
                      <User size={14} className="text-accent" />
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-secondary flex items-center gap-2">
                      <Mail size={14} className="text-accent" />
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest text-secondary flex items-center gap-2">
                    <Phone size={14} className="text-accent" />
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000 (Optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
                  />
                </div>

                {/* Description Input & Voice Trigger */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label htmlFor="description" className="text-xs font-semibold uppercase tracking-widest text-secondary flex items-center gap-2">
                      <FileText size={14} className="text-accent" />
                      Detailed description <span className="text-red-500">*</span>
                    </label>
                    
                    {speechSupported && (
                      <button
                        type="button"
                        onClick={toggleListening}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
                          isListening 
                            ? 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse' 
                            : 'bg-accent/10 border-accent/20 text-accent hover:bg-accent/20'
                        }`}
                      >
                        {isListening ? (
                          <>
                            <MicOff size={12} /> Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic size={12} /> Dictate Workflow
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={5}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the repetitive tasks, workflows, tools involved, or spreadsheets you populate manually on a daily basis..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 resize-none pr-12"
                    />

                    {/* Microphone floating helper or status inside text area */}
                    {isListening && (
                      <div className="absolute right-4 bottom-4 flex items-end gap-1 h-6">
                        {audioLevel.map((level, i) => (
                          <motion.div
                            key={i}
                            className="w-[3px] bg-red-400 rounded-full"
                            animate={{ height: level }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            style={{ maxHeight: '24px' }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {statusMessage && (
                    <p className={`text-xs ${statusMessage.includes('denied') || statusMessage.includes('Error') ? 'text-red-400' : 'text-accent'}`}>
                      {statusMessage}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-white hover:bg-white/90 text-black font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-white/5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin text-black" />
                        Analyzing and Submitting...
                      </>
                    ) : (
                      <>
                        Explore for Free
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="p-12 rounded-3xl bg-zinc-950 border border-accent/20 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-accent/10 text-accent border border-accent/20">
                  <CheckCircle2 size={40} className="animate-bounce" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Workflow Received!</h3>
              <p className="text-secondary font-light max-w-lg mx-auto mb-8 leading-relaxed">
                Thank you! We've successfully captured your workflow description. Our team is already mapping out the potential automation architectures.
              </p>
              
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-black border border-white/5 text-left mb-8 space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Next Steps</h4>
                <ol className="list-decimal list-inside text-sm text-secondary font-light space-y-2 ml-1">
                  <li>Our team analyzes your repetitive steps.</li>
                  <li>We trace AI API integrations and structure layout flows.</li>
                  <li>We contact you via email with an automation blueprint.</li>
                </ol>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-full border border-white/10 hover:border-white/20 text-secondary hover:text-white transition-all text-sm font-medium"
              >
                Submit another workflow
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

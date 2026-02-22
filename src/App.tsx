
import { useState, useEffect } from 'react';
import Home from './components/Home';
import TechnicalArsenal from './components/TechnicalArsenal';
import AboutMe from './components/AboutMe';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// ── Phases ────────────────────────────────────────────────────────────────────
type Phase = 'typing-full' | 'pausing' | 'deleting' | 'typing-short' | 'done';

const FULL_TEXT = 'Martín Gomez Vega';
const SHORT_TEXT = 'MGV';
const TYPE_SPEED = 75;   // ms per char (typing)
const DELETE_SPEED = 35;   // ms per char (backspace)
const PAUSE_MS = 1500; // hold before deleting

// ── Custom hook ───────────────────────────────────────────────────────────────
function useLogoTypewriter() {
  const [display, setDisplay] = useState('');
  const [phase, setPhase] = useState<Phase>('typing-full');
  const [showDot, setShowDot] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing-full') {
      if (display.length < FULL_TEXT.length) {
        timeout = setTimeout(() => setDisplay(FULL_TEXT.slice(0, display.length + 1)), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), PAUSE_MS);
      }
    }

    if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 0);
    }

    if (phase === 'deleting') {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(prev => prev.slice(0, -1)), DELETE_SPEED);
      } else {
        setPhase('typing-short');
      }
    }

    if (phase === 'typing-short') {
      if (display.length < SHORT_TEXT.length) {
        timeout = setTimeout(() => setDisplay(SHORT_TEXT.slice(0, display.length + 1)), TYPE_SPEED);
      } else {
        // Done — show dot and hide cursor
        timeout = setTimeout(() => {
          setShowDot(true);
          setShowCursor(false);
          setPhase('done');
        }, 200);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, display]);

  return { display, showDot, showCursor };
}

// ── Animated logo subcomponent ────────────────────────────────────────────────
function AnimatedLogo() {
  const { display, showDot, showCursor } = useLogoTypewriter();

  return (
    <a href="#home" className="flex items-center gap-0">
      <span className="text-xl font-bold font-mono tracking-tighter whitespace-nowrap">
        {display}
      </span>
      {showDot && <span className="text-fintech-accent text-xl font-bold font-mono">.</span>}
      {showCursor && (
        <span className="inline-block w-0.5 h-5 bg-fintech-text ml-0.5 animate-pulse" />
      )}
    </a>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  return (
    <div className="min-h-screen bg-fintech-primary selection:bg-fintech-accent selection:text-fintech-primary">
      <nav className="fixed w-full z-50 bg-fintech-primary/80 backdrop-blur-md border-b border-fintech-secondary">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="w-56 shrink-0 font-mono tracking-tighter">
            <AnimatedLogo />
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 mx-auto">
            <a href="#services" className="hover:text-fintech-accent transition-colors">Arsenal Técnico</a>
            <a href="#about" className="hover:text-fintech-accent transition-colors">Sobre Mí</a>
          </div>
        </div>
      </nav>

      <main>
        <Home />
        <TechnicalArsenal />
        <AboutMe />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;

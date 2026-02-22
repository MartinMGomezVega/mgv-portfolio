
import { Linkedin } from 'lucide-react';

const Footer = () => (
    <footer className="bg-[#050a12] border-t border-fintech-secondary">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
                © 2026 Martín Gomez Vega{' '}
                <span className="text-gray-500">• Ingeniero Informático.</span>
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-5">
                <a
                    href="https://www.linkedin.com/in/martin-gomez-vega/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-gray-400 hover:text-fintech-accent hover:drop-shadow-[0_0_6px_rgba(100,255,218,0.6)] transition-all duration-300"
                >
                    <Linkedin size={20} />
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;


import { ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import techStackImage from '../assets/images/tech-stack-armor.png';

const Home = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
            {/* Background Elements - Subtle "Steel" grid */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#64FFDA 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="container mx-auto z-10 grid lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fintech-secondary/50 border border-fintech-accent/20 text-fintech-accent text-sm font-mono">
                        <ShieldCheck size={14} />
                        <span>Arquitecturas Blindadas</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        Automatizo procesos. <br />
                        <span className="text-fintech-accent">Construyo sistemas robustos.</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                        Arquitecturas de alto impacto y automatización sin fisuras.
                        Diseño software que escala con la seguridad de un banco y la agilidad de una startup.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="#contact" className="px-8 py-4 bg-fintech-accent text-fintech-primary font-bold rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(100,255,218,0.3)]">
                            Contactame <ArrowRight size={20} />
                        </a>
                    </div>
                </motion.div>

                {/* Visual Content — Tech Stack Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <img
                        src={techStackImage}
                        alt="Arquitectura blindada con React, Go y n8n"
                        className="w-full max-w-lg lg:max-w-3xl mx-auto lg:mr-0 h-auto rounded-2xl shadow-[0_0_50px_rgba(100,255,218,0.15)] hover:shadow-[0_0_70px_rgba(100,255,218,0.3)] transition-all duration-500"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Home;


import { Bot, Code2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

const TechnicalArsenal = () => {
    const services = [
        {
            icon: <Bot size={40} />,
            title: "Automatización (n8n)",
            description: "Elimino tareas repetitivas. Bots que conectan WhatsApp, Gmail y CRMs sin intervención humana.",
            techs: ["n8n", "Webhooks", "APIs"],
            highlight: "Ahorro real de horas/hombre"
        },
        {
            icon: <Code2 size={40} />,
            title: "Desarrollo Web",
            description: "Interfaces Single Page Application (SPA) rápidas y reactivas. Sin recargas innecesarias.",
            techs: ["React", "TypeScript", "Tailwind"],
            highlight: "UX fluido tipo App Nativa"
        },
        {
            icon: <ShieldAlert size={40} />,
            title: "Backend Seguro",
            description: "Sistemas robustos en Go. Lógica de negocio blindada y escalable bancariamente.",
            techs: ["Golang", "PostgreSQL", "Docker"],
            highlight: "Cero pérdida de datos"
        }
    ];

    return (
        <section id="services" className="py-24 bg-fintech-primary relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-fintech-secondary/10 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Section header */}
                <motion.div
                    className="mb-16 max-w-2xl"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-gradient">Arsenal Técnico</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Herramientas seleccionadas por su robustez. Sin tecnologías de moda pasajera, solo lo que funciona y escala.
                    </p>
                </motion.div>

                {/* Cards with stagger */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariant}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="group relative bg-fintech-secondary/20 border border-[#222] p-8 rounded-xl hover:border-fintech-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(100,255,218,0.1)]"
                        >
                            {/* "Armor Plate" Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>

                            <div className="mb-6 text-fintech-accent bg-fintech-secondary/30 w-16 h-16 rounded-lg flex items-center justify-center border border-fintech-secondary group-hover:border-fintech-accent/30 transition-colors">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-fintech-text group-hover:text-fintech-accent transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-gray-400 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="pt-6 border-t border-fintech-secondary/50">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {service.techs.map((tech, i) => (
                                        <span key={i} className="text-xs font-mono text-fintech-highlight bg-fintech-highlight/10 px-2 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm font-semibold text-fintech-text flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-fintech-accent animate-pulse"></span>
                                    {service.highlight}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TechnicalArsenal;

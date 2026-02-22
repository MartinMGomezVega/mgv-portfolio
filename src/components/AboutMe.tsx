
import { Box, Layers, FileText } from 'lucide-react';

const AboutMe = () => {
    return (
        <section id="about" className="py-24 bg-fintech-secondary/10 border-t border-fintech-secondary relative">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fintech-primary border border-fintech-highlight/20 text-fintech-highlight text-sm font-mono">
                        <span className="w-2 h-2 rounded-full bg-fintech-highlight"></span>
                        <span>Ingeniero Informático</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                        Ingeniería de Software pura. <br />
                        <span className="text-fintech-accent">Sistemas que no fallan.</span>
                    </h2>

                    <p className="text-gray-400 text-lg leading-relaxed">
                        Soy Ingeniero Informático. Construyo sistemas seguros, escalables y listos para producción.
                        Sin parches temporales ni deuda técnica innecesaria.
                    </p>

                    <p className="text-gray-400 text-lg leading-relaxed">
                        Me especializo en arquitecturas que soportan alta carga y operan con la fiabilidad.
                        Código limpio, testeado y eficiente.
                    </p>

                    <div className="grid grid-cols-2 gap-6 pt-6">
                        <div className="flex flex-col gap-2">
                            <Layers className="text-fintech-highlight" size={32} />
                            <h4 className="font-bold text-fintech-text">Estructura Sólida</h4>
                            <p className="text-sm text-gray-500">Bases de datos y APIs diseñadas para escalar.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Box className="text-fintech-accent" size={32} />
                            <h4 className="font-bold text-fintech-text">Alto Rendimiento</h4>
                            <p className="text-sm text-gray-500">Sistemas optimizados para máxima velocidad.</p>
                        </div>
                    </div>
                </div>

                {/* CV Download Card */}
                <div className="relative h-[400px] bg-fintech-primary rounded-2xl border border-fintech-secondary p-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'linear-gradient(#112240 1px, transparent 1px)',
                            backgroundSize: '100% 20px'
                        }}
                    ></div>

                    <div className="relative z-10 text-center space-y-6 p-8 bg-fintech-secondary/50 backdrop-blur-sm rounded-xl border border-fintech-accent/20 shadow-[0_0_40px_rgba(100,255,218,0.05)] max-w-sm w-full">
                        <div className="w-20 h-20 mx-auto bg-fintech-accent/10 rounded-full flex items-center justify-center border border-fintech-accent/30 mb-4 group hover:scale-110 transition-transform duration-300">
                            <FileText size={40} className="text-fintech-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-fintech-text">Currículum Vitae</h3>
                        <p className="text-gray-400 text-sm">
                            Experiencia detallada, stack tecnológico y trayectoria académica.
                        </p>
                        <a
                            href="/cv-martin-gomez-vega.pdf"
                            download
                            className="inline-flex items-center gap-2 px-6 py-3 bg-fintech-accent text-fintech-primary font-bold rounded-lg hover:bg-opacity-90 transition-all w-full justify-center shadow-[0_0_20px_rgba(100,255,218,0.2)] hover:shadow-[0_0_30px_rgba(100,255,218,0.4)]"
                        >
                            Descargar PDF
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutMe;

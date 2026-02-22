
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { countries } from '../utils/countries';

// --- Types ---
interface FormData {
    nombre: string;
    apellido: string;
    email: string;
    countryCode: string;
    celular: string;
    mensaje: string;
}

interface FormErrors {
    nombre?: string;
    apellido?: string;
    email?: string;
    celular?: string;
    mensaje?: string;
}

// --- Validation ---
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-]+$/;

function validate(data: FormData): FormErrors {
    const errors: FormErrors = {};

    if (!data.nombre.trim() || data.nombre.trim().length < 2)
        errors.nombre = 'El nombre debe tener al menos 2 caracteres.';

    if (!data.apellido.trim() || data.apellido.trim().length < 2)
        errors.apellido = 'El apellido debe tener al menos 2 caracteres.';

    if (!data.email.trim() || !EMAIL_REGEX.test(data.email))
        errors.email = 'Ingresá un correo electrónico válido.';

    if (data.celular.trim()) {
        if (!PHONE_REGEX.test(data.celular) || data.celular.replace(/[\s\-]/g, '').length < 8)
            errors.celular = 'El celular debe tener al menos 8 dígitos (solo números, espacios o guiones).';
    }

    if (!data.mensaje.trim() || data.mensaje.trim().length < 20)
        errors.mensaje = 'El mensaje debe tener al menos 20 caracteres.';

    return errors;
}

// --- Initial state ---
const INITIAL_FORM: FormData = {
    nombre: '',
    apellido: '',
    email: '',
    countryCode: '+54',
    celular: '',
    mensaje: '',
};

// --- Input class helpers ---
const inputBase =
    'w-full bg-fintech-primary border text-fintech-text p-4 rounded-lg focus:outline-none transition-all';
const inputNormal = `${inputBase} border-fintech-secondary focus:border-fintech-accent focus:shadow-[0_0_10px_rgba(100,255,218,0.2)]`;
const inputError = `${inputBase} border-red-500/60 focus:border-red-400 focus:shadow-[0_0_10px_rgba(239,68,68,0.2)]`;

// --- Webhook ---
const WEBHOOK_URL =
    import.meta.env.VITE_N8N_WEBHOOK_URL as string ||
    'https://n8n-mgv-backend.onrender.com/webhook/contact-form';

// --- Component ---
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [showToast, setShowToast] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
    const [networkError, setNetworkError] = useState<string | null>(null);

    // Auto-dismiss toast after 5s and reset button to idle
    useEffect(() => {
        if (!showToast) return;
        const timer = setTimeout(() => {
            setShowToast(false);
            setSubmitStatus('idle');
        }, 5000);
        return () => clearTimeout(timer);
    }, [showToast]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitStatus('loading');
        setNetworkError(null);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${formData.nombre.trim()} ${formData.apellido.trim()}`,
                    email: formData.email.trim(),
                    phone: formData.celular.trim()
                        ? `${formData.countryCode} ${formData.celular.trim()}`
                        : '',
                    message: formData.mensaje.trim(),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            setSubmitStatus('success');
            setShowToast(true);   // triggers the useEffect auto-dismiss
            setFormData(INITIAL_FORM);
            setErrors({});

        } catch (err) {
            console.error('Webhook error:', err);
            setNetworkError('No se pudo enviar el mensaje. Por favor, intentá de nuevo.');
            setSubmitStatus('error');
        }
    };

    return (
        <>
            <section id="contact" className="py-24 bg-fintech-primary relative">
                <div className="container mx-auto px-6 max-w-4xl">

                    <motion.div
                        className="text-center mb-16 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <h2 className="text-4xl font-bold">
                            <span className="text-fintech-accent">Contacto</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto">
                            Ya sea para un proyecto, una entrevista o una consulta técnica, estoy a un mensaje de distancia.
                        </p>
                    </motion.div>

                    {/* Network error banner */}
                    {submitStatus === 'error' && networkError && (
                        <div className="mb-8 flex items-center gap-3 px-6 py-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400">
                            <p className="text-sm font-medium">{networkError}</p>
                            <button
                                type="button"
                                onClick={() => setSubmitStatus('idle')}
                                className="ml-auto text-xs underline hover:text-red-300 transition-colors shrink-0"
                            >
                                Reintentar
                            </button>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="grid md:grid-cols-2 gap-6 bg-fintech-secondary/30 p-8 md:p-12 rounded-2xl border border-fintech-secondary"
                    >
                        {/* Nombre */}
                        <div className="space-y-1.5">
                            <label htmlFor="nombre" className="text-sm font-bold text-fintech-text uppercase tracking-wider">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                                className={errors.nombre ? inputError : inputNormal}
                            />
                            {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
                        </div>

                        {/* Apellido */}
                        <div className="space-y-1.5">
                            <label htmlFor="apellido" className="text-sm font-bold text-fintech-text uppercase tracking-wider">Apellido</label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                placeholder="Tu apellido"
                                className={errors.apellido ? inputError : inputNormal}
                            />
                            {errors.apellido && <p className="text-red-400 text-xs mt-1">{errors.apellido}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-sm font-bold text-fintech-text uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="nombre@empresa.com"
                                className={errors.email ? inputError : inputNormal}
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Celular con selector de código de área */}
                        <div className="space-y-1.5">
                            <label htmlFor="celular" className="text-sm font-bold text-fintech-text uppercase tracking-wider">Celular (Opcional)</label>
                            <div className={`flex rounded-lg overflow-hidden border transition-all focus-within:shadow-[0_0_10px_rgba(100,255,218,0.2)] ${errors.celular ? 'border-red-500/60 focus-within:border-red-400 focus-within:shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-fintech-secondary focus-within:border-fintech-accent'}`}>
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    aria-label="Código de país"
                                    className="bg-fintech-secondary text-fintech-text text-sm p-4 focus:outline-none border-r border-fintech-secondary/50 cursor-pointer shrink-0"
                                >
                                    {countries.map(({ flag, code, name }) => (
                                        <option key={`${name}-${code}`} value={code}>
                                            {flag} {code}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    id="celular"
                                    name="celular"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    placeholder="..."
                                    className="w-full bg-fintech-primary text-fintech-text p-4 focus:outline-none"
                                />
                            </div>
                            {errors.celular && <p className="text-red-400 text-xs mt-1">{errors.celular}</p>}
                        </div>

                        {/* Mensaje */}
                        <div className="md:col-span-2 space-y-1.5">
                            <label htmlFor="mensaje" className="text-sm font-bold text-fintech-text uppercase tracking-wider">Mensaje</label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                value={formData.mensaje}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Contame sobre tu propuesta, proyecto o consulta..."
                                className={`resize-none ${errors.mensaje ? inputError : inputNormal}`}
                            ></textarea>
                            {errors.mensaje && <p className="text-red-400 text-xs mt-1">{errors.mensaje}</p>}
                        </div>

                        {/* Submit — morphing button */}
                        <div className="md:col-span-2 pt-4 relative flex flex-col items-center">
                            <motion.button
                                type="submit"
                                disabled={submitStatus === 'loading' || submitStatus === 'success'}
                                animate={{
                                    width: submitStatus === 'loading' || submitStatus === 'success' ? '56px' : '100%',
                                    borderRadius: submitStatus === 'loading' || submitStatus === 'success' ? '50%' : '8px',
                                }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className={`h-14 flex items-center justify-center font-bold text-lg overflow-hidden
                                    ${submitStatus === 'success'
                                        ? 'bg-fintech-accent shadow-[0_0_30px_rgba(100,255,218,0.7)]'
                                        : 'bg-fintech-accent shadow-[0_0_20px_rgba(100,255,218,0.4)] hover:shadow-[0_0_30px_rgba(100,255,218,0.6)]'
                                    } text-fintech-primary transition-shadow`
                                }
                            >
                                <AnimatePresence mode="wait">
                                    {(submitStatus === 'idle' || submitStatus === 'error') && (
                                        <motion.span
                                            key="idle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-center gap-2 whitespace-nowrap"
                                        >
                                            Enviar mensaje <Send size={20} />
                                        </motion.span>
                                    )}
                                    {submitStatus === 'loading' && (
                                        <motion.span
                                            key="loading"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Loader2 size={24} className="animate-spin" />
                                        </motion.span>
                                    )}
                                    {submitStatus === 'success' && (
                                        <motion.span
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Check size={24} strokeWidth={3} />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            {/* Slow-server hint — absolute so it never affects form height */}
                            <AnimatePresence>
                                {submitStatus === 'loading' && (
                                    <motion.p
                                        key="hint"
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 3, duration: 0.5 }}
                                        className="absolute top-full mt-2 text-xs text-gray-500 text-center pointer-events-none whitespace-nowrap"
                                    >
                                        Enviando… (puede demorar hasta 50 seg)
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                    </form>
                </div>
            </section>

            {/* ── Toast notification — rendered via Portal into document.body ── */}
            {createPortal(
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            key="toast"
                            initial={{ opacity: 0, x: 80 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 80 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed bottom-10 right-10 z-[100] flex items-center gap-3 px-5 py-4 rounded-xl border border-fintech-accent/60 shadow-[0_0_30px_rgba(100,255,218,0.15)] backdrop-blur-sm"
                            style={{ backgroundColor: '#112240' }}
                        >
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-fintech-accent/20 shrink-0">
                                <Check size={16} className="text-fintech-accent" strokeWidth={3} />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-white">¡Mensaje enviado!</p>
                                <p className="text-xs text-gray-400">Me pondré en contacto a la brevedad.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default ContactForm;

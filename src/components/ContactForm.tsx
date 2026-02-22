
import { useState } from 'react';
import { Send, CheckCircle, Loader2, Check } from 'lucide-react';
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

// --- Component ---
type SubmitStatus = 'idle' | 'loading' | 'success';

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear the specific error on change
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Drive the morphing animation
        setSubmitStatus('loading');

        setTimeout(() => {
            console.log('Form submitted:', { ...formData });
            setSubmitStatus('success');
            setSubmitted(true);
            setFormData(INITIAL_FORM);
            setErrors({});

            // Reset button and banner after 3s
            setTimeout(() => {
                setSubmitStatus('idle');
                setSubmitted(false);
            }, 3000);
        }, 1800);
    };

    return (
        <section id="contact" className="py-24 bg-fintech-primary relative">
            <div className="container mx-auto px-6 max-w-4xl">

                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-bold">
                        <span className="text-fintech-accent">Contacto</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Ya sea para un proyecto, una entrevista o una consulta técnica, estoy a un mensaje de distancia.
                    </p>
                </div>

                {/* Success message */}
                {submitted && (
                    <div className="mb-8 flex items-center gap-3 px-6 py-4 rounded-xl border border-fintech-accent/40 bg-fintech-accent/10 text-fintech-accent">
                        <CheckCircle size={20} className="shrink-0" />
                        <p className="text-sm font-medium">¡Mensaje enviado! Me pondré en contacto a la brevedad.</p>
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
                    <div className="md:col-span-2 pt-4 flex justify-center">
                        <motion.button
                            type="submit"
                            disabled={submitStatus !== 'idle'}
                            animate={{
                                width: submitStatus === 'idle' ? '100%' : '56px',
                                borderRadius: submitStatus === 'idle' ? '8px' : '50%',
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
                                {submitStatus === 'idle' && (
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
                    </div>

                </form>
            </div>
        </section>
    );
};

export default ContactForm;

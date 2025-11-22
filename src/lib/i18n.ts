import { cookies } from "next/headers"

export const LANGS = ["en", "es", "el", "fr", "de", "pt", "it", "nl", "tr", "hi", "ja", "zh"] as const
export type Lang = typeof LANGS[number]

export const SPECIALTIES = [
    "General dermatology",
    "Pediatric dermatology",
    "Acne & rosacea",
    "Eczema & psoriasis",
    "Hair & scalp",
    "Skin cancer / Mohs",
    "Cosmetic dermatology",
    "Teledermatology",
]

type Dictionary = typeof en

export async function getLanguageFromCookie(): Promise<Lang> {
    const cookieStore = await cookies()
    const cookie = cookieStore.get("lang")?.value
    return LANGS.includes(cookie as Lang) ? (cookie as Lang) : "en"
}

const dictionaries: Record<Lang, Dictionary> = {
    en,
    es,
    el: en, // TODO: add Greek translations
    fr: en, // TODO: add French translations
    de: en, // TODO: add German translations
    pt: en, // TODO: add Portuguese translations
    it: en, // TODO: add Italian translations
    nl: en, // TODO: add Dutch translations
    tr: en, // TODO: add Turkish translations
    hi: en, // TODO: add Hindi translations
    ja: en, // TODO: add Japanese translations
    zh: en, // TODO: add Chinese translations
}

export function getDictionary(lang: Lang): Dictionary {
    return dictionaries[lang] ?? en
}

const en = {
    common: {
        brand: "DermaConnect",
        nav: {
            features: "Features",
            doctors: "For Doctors",
            signin: "Sign In",
            joinDoctor: "Join as Doctor",
        },
        language: "Language",
        online: "Online",
        offline: "Offline",
        terms: "Terms of Service",
        privacy: "Privacy",
        genericError: "Something went wrong. Please try again.",
        goOnlinePrompt: "Go online to view and accept pending requests.",
    },
    landing: {
        hero: {
            eyebrow: "Dermatology, reimagined",
            title: "Expert skin care without the wait.",
            subtitle:
                "DermaConnect pairs you with world-class dermatologists for rapid answers, personalized treatment plans, and ongoing support—whenever and wherever you need it.",
            primary: "Get care now",
            secondary: "I'm a dermatologist",
            stats: ["< 2 hrs average response", "97% patient satisfaction", "Secure & HIPAA-ready"],
        },
        highlights: [
            {
                title: "Board-certified specialists",
                description:
                    "Every dermatologist on DermaConnect is vetted, licensed, and supported by continuous quality reviews.",
            },
            {
                title: "Results in hours, not weeks",
                description: "Submit photos securely and get a personalized plan faster than traditional clinic waitlists.",
            },
            {
                title: "24/7 follow-ups",
                description: "Chat with your care team any time. We keep your skin journey on track with proactive check-ins.",
            },
        ],
        whyTitle: "Why DermaConnect",
        whyHeading: "Designed for peace of mind",
        whyCopy:
            "From first photo to final follow-up, we combine human expertise with thoughtful technology so you can get answers fast and stay confident in your care.",
        whyBadges: ["Available worldwide", "Secure by default"],
        featureChips: ["Photo analysis", "Prescription support", "Follow-up reminders", "Multilingual care"],
        steps: {
            title: "A guided journey from first tap to clear skin",
            items: [
                {
                    label: "Share your concern",
                    detail: "Upload clear photos and describe symptoms—no appointments required.",
                },
                {
                    label: "Get matched instantly",
                    detail: "Routing pairs you with the right specialist based on condition, language, and urgency.",
                },
                {
                    label: "Receive a tailored plan",
                    detail: "Clear diagnosis, treatment roadmap, and prescriptions when appropriate.",
                },
                {
                    label: "Track progress",
                    detail: "Follow-ups, reminders, and photo comparisons keep your skin improving.",
                },
            ],
        },
        outcomes: {
            eyebrow: "Trusted outcomes",
            title: "People feel better with DermaConnect",
            subtitle:
                "We combine measurable results with compassionate care. Here’s what patients and physicians say about partnering with us.",
            metrics: [
                { label: "Visits resolved", value: "40k+" },
                { label: "Countries served", value: "18" },
                { label: "Avg. satisfaction", value: "4.9/5" },
            ],
            testimonials: [
                {
                    quote: "I waited months for an in-person visit. DermaConnect gave me answers overnight.",
                    name: "Sara, 29",
                    role: "Psoriasis patient",
                },
                {
                    quote: "As a physician, I can collaborate seamlessly with patients across time zones.",
                    name: "Dr. K. Allen",
                    role: "Board-certified dermatologist",
                },
                {
                    quote: "The progress tracker kept me consistent. My acne cleared in weeks, not months.",
                    name: "Michael, 24",
                    role: "Member since 2023",
                },
            ],
        },
        cta: {
            eyebrow: "Ready when you are",
            title: "Start your skin transformation today",
            subtitle:
                "Create your secure account in minutes and connect with a dermatologist who can give you answers, clarity, and ongoing support.",
            patient: "Join as patient",
            doctor: "Partner as dermatologist",
        },
    },
    auth: {
        loginTitle: "Sign In",
        loginSubtitle: "Enter your email to receive a magic link",
        emailLabel: "Email",
        submit: "Send Magic Link",
    },
    dashboard: {
        headerSignedIn: (email: string, role: string) => `${email} (${role})`,
        signOut: "Sign Out",
    },
    patient: {
        title: "Patient Dashboard",
        request: "Request Consultation",
        careTeam: "My Care Team",
        assigned: "Assigned dermatologist",
        status: "Status",
        availability: "Availability",
        recent: "Recent Consultations",
        noConsultations: "No consultations yet.",
        cancel: "Cancel consultation",
        doctorLabel: "Doctor",
        notAssigned: "Not assigned",
        placeholders: {
            description: "Brief summary",
            symptoms: "Key symptoms (e.g. itch, redness)",
            duration: "Duration (e.g. 3 days)",
            images: "Image URLs (one per line)",
            anySpecialty: "Any specialty",
        },
    },
    doctor: {
        title: "Doctor Workspace",
        incoming: "Incoming Requests",
        myConsultations: "My Consultations",
        profile: "My Profile",
        bio: "Bio",
        saveProfile: "Save profile",
        markCompleted: "Mark Completed",
        release: "Release to queue",
        saveNotes: "Save notes",
        accept: "Accept Request",
        notesLabel: "Notes",
        noPending: "No pending requests.",
        noAssigned: "No assigned consultations.",
        offlineNotice: "You are offline; set yourself online to accept new consultations.",
        specialtyPrompt: "Choose your specialty below to go online.",
        noMatch: "No requests matched your specialty. Switch to a different specialty to view all.",
        specialtyRequired: "Set your specialty before going online",
        bioHint: "Keep your specialty and bio current; patients will see this when assigned.",
        filterAll: "Showing all specialties",
        filterSpecific: (s: string) => `Filtered to ${s}`,
        acceptTooltip: "Set yourself online to accept requests",
    },
}

const es: Dictionary = {
    common: {
        brand: "DermaConnect",
        nav: {
            features: "Funciones",
            doctors: "Para médicos",
            signin: "Ingresar",
            joinDoctor: "Unirme como médico",
        },
        language: "Idioma",
        online: "En línea",
        offline: "Desconectado",
        terms: "Términos del servicio",
        privacy: "Privacidad",
        genericError: "Algo salió mal. Inténtalo nuevamente.",
        goOnlinePrompt: "Activa en línea para ver y aceptar solicitudes pendientes.",
    },
    landing: {
        hero: {
            eyebrow: "Dermatología reinventada",
            title: "Cuidado experto sin espera.",
            subtitle:
                "DermaConnect te conecta con dermatólogos de clase mundial para respuestas rápidas, planes personalizados y seguimiento continuo cuando lo necesites.",
            primary: "Recibir atención ahora",
            secondary: "Soy dermatólogo",
            stats: ["< 2 h respuesta promedio", "97% satisfacción", "Seguro y listo para HIPAA"],
        },
        highlights: [
            {
                title: "Especialistas certificados",
                description:
                    "Cada dermatólogo en DermaConnect está validado, licenciado y evaluado continuamente.",
            },
            {
                title: "Resultados en horas, no semanas",
                description:
                    "Envía fotos de forma segura y recibe un plan personalizado más rápido que en listas de espera tradicionales.",
            },
            {
                title: "Seguimiento 24/7",
                description:
                    "Chatea con tu equipo de atención en cualquier momento. Te acompañamos con recordatorios proactivos.",
            },
        ],
        whyTitle: "Por qué DermaConnect",
        whyHeading: "Diseñado para tu tranquilidad",
        whyCopy:
            "Desde la primera foto hasta el seguimiento final, combinamos experiencia humana con tecnología para darte respuestas rápidas y confianza en tu cuidado.",
        whyBadges: ["Disponible en todo el mundo", "Seguro por defecto"],
        featureChips: ["Análisis de fotos", "Soporte de recetas", "Recordatorios de seguimiento", "Atención multilingüe"],
        steps: {
            title: "Un recorrido guiado hasta una piel sana",
            items: [
                {
                    label: "Comparte tu caso",
                    detail: "Sube fotos claras y describe síntomas—sin citas previas.",
                },
                {
                    label: "Asignación inmediata",
                    detail: "Te conectamos con el especialista adecuado según condición, idioma y urgencia.",
                },
                {
                    label: "Plan a medida",
                    detail: "Diagnóstico claro, tratamiento y recetas cuando aplique.",
                },
                {
                    label: "Sigue el progreso",
                    detail: "Mensajes de control, recordatorios y comparación de fotos para ver mejoras.",
                },
            ],
        },
        outcomes: {
            eyebrow: "Resultados confiables",
            title: "Las personas se sienten mejor con DermaConnect",
            subtitle:
                "Combinamos resultados medibles con atención empática. Esto dicen pacientes y médicos sobre trabajar con nosotros.",
            metrics: [
                { label: "Casos resueltos", value: "40k+" },
                { label: "Países atendidos", value: "18" },
                { label: "Satisfacción promedio", value: "4.9/5" },
            ],
            testimonials: [
                {
                    quote: "Esperé meses para una visita presencial. DermaConnect me dio respuestas en una noche.",
                    name: "Sara, 29",
                    role: "Paciente de psoriasis",
                },
                {
                    quote: "Como médico, colaboro sin fricción con pacientes en múltiples zonas horarias.",
                    name: "Dra. K. Allen",
                    role: "Dermatóloga certificada",
                },
                {
                    quote: "El seguimiento me mantuvo constante. Mi acné mejoró en semanas, no meses.",
                    name: "Miguel, 24",
                    role: "Miembro desde 2023",
                },
            ],
        },
        cta: {
            eyebrow: "Listos cuando tú quieras",
            title: "Comienza tu transformación de piel hoy",
            subtitle:
                "Crea tu cuenta segura en minutos y conecta con un dermatólogo para respuestas, claridad y acompañamiento.",
            patient: "Unirme como paciente",
            doctor: "Asociarme como dermatólogo",
        },
    },
    auth: {
        loginTitle: "Ingresar",
        loginSubtitle: "Ingresa tu correo para recibir un enlace mágico",
        emailLabel: "Correo",
        submit: "Enviar enlace",
    },
    dashboard: {
        headerSignedIn: (email: string, role: string) => `${email} (${role})`,
        signOut: "Cerrar sesión",
    },
    patient: {
        title: "Panel de paciente",
        request: "Solicitar consulta",
        careTeam: "Mi equipo",
        assigned: "Dermatólogo asignado",
        status: "Estado",
        availability: "Disponibilidad",
        recent: "Consultas recientes",
        noConsultations: "Aún no tienes consultas.",
        cancel: "Cancelar consulta",
        doctorLabel: "Médico",
        notAssigned: "Sin asignar",
        placeholders: {
            description: "Resumen breve",
            symptoms: "Síntomas clave (p. ej., picor, enrojecimiento)",
            duration: "Duración (p. ej., 3 días)",
            images: "URLs de imágenes (una por línea)",
            anySpecialty: "Cualquier especialidad",
        },
    },
    doctor: {
        title: "Panel médico",
        incoming: "Solicitudes entrantes",
        myConsultations: "Mis consultas",
        profile: "Mi perfil",
        bio: "Biografía",
        saveProfile: "Guardar perfil",
        markCompleted: "Marcar completada",
        release: "Liberar a la cola",
        saveNotes: "Guardar notas",
        accept: "Aceptar solicitud",
        notesLabel: "Notas",
        noPending: "Sin solicitudes pendientes.",
        noAssigned: "No tienes consultas asignadas.",
        offlineNotice: "Estás desconectado; ponte en línea para aceptar nuevas consultas.",
        specialtyPrompt: "Elige tu especialidad para activar en línea.",
        noMatch: "No hay solicitudes que coincidan con tu especialidad. Cambia la especialidad para ver todas.",
        specialtyRequired: "Define tu especialidad antes de conectarte.",
        bioHint: "Mantén tu especialidad y biografía actualizadas; los pacientes las verán al asignarte.",
        filterAll: "Mostrando todas las especialidades",
        filterSpecific: (s: string) => `Filtrado a ${s}`,
        acceptTooltip: "Ponte en línea para aceptar solicitudes",
    },
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
    const highlights = [
        {
            title: "Board-certified specialists",
            description: "Every dermatologist on DermaConnect is vetted, licensed, and supported by continuous quality reviews.",
        },
        {
            title: "Results in hours, not weeks",
            description: "Submit photos securely and get a personalized plan faster than traditional clinic waitlists.",
        },
        {
            title: "24/7 follow-ups",
            description: "Chat with your care team any time. We keep your skin journey on track with proactive check-ins.",
        },
    ]

    const steps = [
        {
            label: "Share your concern",
            detail: "Upload clear photos and describe symptoms—no appointments required.",
        },
        {
            label: "Get matched instantly",
            detail: "Our routing engine pairs you with the right specialist based on condition, language, and urgency.",
        },
        {
            label: "Receive a tailored plan",
            detail: "You get a clear diagnosis, treatment roadmap, and prescriptions when appropriate.",
        },
        {
            label: "Track progress",
            detail: "Follow-up messages, reminders, and photo comparisons ensure your skin keeps improving.",
        },
    ]

    const testimonials = [
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
    ]

    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-white">
            <header className="relative z-20 flex h-16 items-center border-b border-white/10 px-4 backdrop-blur md:px-10">
                <Link className="flex items-center gap-3" href="#">
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 shadow-lg shadow-emerald-500/30" />
                    <span className="text-xl font-semibold tracking-tight">DermaConnect</span>
                </Link>
                <nav className="ml-auto flex items-center gap-4 text-sm font-medium text-white/80 sm:gap-8">
                    <Link className="transition hover:text-white" href="#features">
                        Features
                    </Link>
                    <Link className="transition hover:text-white" href="#doctors">
                        For Doctors
                    </Link>
                    <Link className="transition hover:text-white" href="/auth/login">
                        Sign In
                    </Link>
                    <Link href="/auth/doctor/signup">
                        <Button className="bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                            Join as Doctor
                        </Button>
                    </Link>
                </nav>
            </header>

            <main className="flex-1">
                <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 sm:py-24">
                    <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
                    <div className="absolute right-[-5%] top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_45%)]" />

                    <div className="relative z-10 container mx-auto px-4 md:px-10">
                        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                            <div className="space-y-6 text-left">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100">
                                    Dermatology, reimagined
                                </div>
                                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                    Expert skin care without the wait.
                                </h1>
                                <p className="max-w-2xl text-lg text-slate-200/80 sm:text-xl">
                                    DermaConnect pairs you with world-class dermatologists for rapid answers, personalized treatment plans, and ongoing support—whenever and wherever you need it.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/auth/login">
                                        <Button className="h-12 rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 px-6 text-base font-semibold text-slate-950 shadow-xl shadow-emerald-500/30 transition hover:scale-[1.02]">
                                            Get care now
                                        </Button>
                                    </Link>
                                    <Link href="/auth/doctor/signup">
                                        <Button variant="outline" className="h-12 rounded-xl border-white/30 bg-white/5 px-6 text-base font-semibold text-white transition hover:border-white hover:bg-white/10">
                                            I&apos;m a dermatologist
                                        </Button>
                                    </Link>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    {["< 2 hrs average response", "97% patient satisfaction", "Secure & HIPAA-ready"].map((item) => (
                                        <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -left-10 -top-6 h-20 w-20 rounded-full bg-emerald-400/30 blur-2xl" />
                                <div className="absolute -right-6 -bottom-10 h-24 w-24 rounded-full bg-blue-400/30 blur-2xl" />
                                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-6 shadow-2xl">
                                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm text-white/70">
                                        <span className="font-semibold text-white">Live queue</span>
                                        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                                            Specialists online
                                        </span>
                                    </div>
                                    <div className="mt-4 space-y-3">
                                        {["Acne & breakouts", "Eczema flares", "Mole review", "Post-procedure care"].map((caseName, idx) => (
                                            <div key={caseName} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-white">{caseName}</p>
                                                    <p className="text-xs text-white/60">Assigned to Dr. {idx === 1 ? "Chen" : idx === 2 ? "Hayes" : idx === 3 ? "Omar" : "Singh"}</p>
                                                </div>
                                                <span className="text-xs font-semibold text-emerald-200">Responding now</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-400/20 via-cyan-400/10 to-blue-400/20 p-4 text-sm text-white/80">
                                        <p className="font-semibold text-white">Continuity you can feel</p>
                                        <p className="text-white/70">Our care team follows your progress with proactive check-ins and photo comparisons.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="bg-slate-900/60 py-16 sm:py-20">
                    <div className="container mx-auto px-4 md:px-10">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                            <div className="space-y-3">
                                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">Why DermaConnect</p>
                                <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Designed for peace of mind</h2>
                                <p className="max-w-2xl text-lg text-white/70">
                                    From first photo to final follow-up, we combine human expertise with thoughtful technology so you can get answers fast and stay confident in your care.
                                </p>
                            </div>
                            <div className="flex gap-4 text-sm text-white/70">
                                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    Available worldwide
                                </div>
                                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                                    Secure by default
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 grid gap-6 lg:grid-cols-3">
                            {highlights.map((item) => (
                                <div key={item.title} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg transition hover:-translate-y-1 hover:border-emerald-300/50 hover:shadow-emerald-500/30">
                                    <div className="absolute right-4 top-4 h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 blur-xl transition group-hover:scale-110" />
                                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                                    <p className="mt-3 text-white/70">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="doctors" className="bg-slate-950 py-16 sm:py-20">
                    <div className="container mx-auto px-4 md:px-10">
                        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                            <div className="space-y-4">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">How it works</p>
                                <h2 className="text-3xl font-bold sm:text-4xl">A guided journey from first tap to clear skin</h2>
                                <p className="text-lg text-white/70">
                                    We obsess over every touchpoint so patients and dermatologists can focus on results instead of logistics.
                                </p>
                                <div className="flex flex-wrap gap-3 text-sm text-white/70">
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Photo analysis</span>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Prescription support</span>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Follow-up reminders</span>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Multilingual care</span>
                                </div>
                            </div>

                            <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
                                {steps.map((step, index) => (
                                    <div key={step.label} className="relative flex gap-4 rounded-2xl border border-white/5 bg-slate-900/60 p-4 transition hover:border-emerald-300/40">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/30 to-blue-400/30 text-lg font-semibold text-white">
                                            {index + 1}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-base font-semibold text-white">{step.label}</p>
                                            <p className="text-sm text-white/70">{step.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-16 sm:py-20">
                    <div className="container mx-auto px-4 md:px-10">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="space-y-3">
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">Trusted outcomes</p>
                                <h2 className="text-3xl font-bold sm:text-4xl">People feel better with DermaConnect</h2>
                                <p className="max-w-2xl text-lg text-white/70">
                                    We combine measurable results with compassionate care. Here’s what patients and physicians say about partnering with us.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/80">
                                <div>
                                    <p className="text-3xl font-bold text-white">40k+</p>
                                    <p className="text-sm">Visits resolved</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">18</p>
                                    <p className="text-sm">Countries served</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">4.9/5</p>
                                    <p className="text-sm">Avg. satisfaction</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 grid gap-6 lg:grid-cols-3">
                            {testimonials.map((item) => (
                                <div key={item.name} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg transition hover:-translate-y-1 hover:border-emerald-300/40">
                                    <p className="text-lg font-semibold text-white">“{item.quote}”</p>
                                    <p className="mt-4 text-sm font-semibold text-emerald-200">{item.name}</p>
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">{item.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-slate-950 py-16 sm:py-20">
                    <div className="container mx-auto px-4 md:px-10">
                        <div className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-blue-500/20 px-6 py-10 text-center shadow-2xl sm:px-10">
                            <div className="space-y-2">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100">Ready when you are</p>
                                <h2 className="text-3xl font-bold sm:text-4xl">Start your skin transformation today</h2>
                                <p className="mx-auto max-w-2xl text-lg text-white/80">
                                    Create your secure account in minutes and connect with a dermatologist who can give you answers, clarity, and ongoing support.
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/auth/login">
                                    <Button className="h-12 rounded-xl bg-white text-base font-semibold text-slate-900 shadow-lg transition hover:-translate-y-[2px]">
                                        Join as patient
                                    </Button>
                                </Link>
                                <Link href="/auth/doctor/signup">
                                    <Button variant="outline" className="h-12 rounded-xl border-white/40 bg-white/10 text-base font-semibold text-white transition hover:border-white hover:bg-white/20">
                                        Partner as dermatologist
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="flex flex-col gap-2 border-t border-white/10 px-4 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:px-10">
                <p>© 2024 DermaConnect. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="transition hover:text-white" href="#">
                        Terms of Service
                    </Link>
                    <Link className="transition hover:text-white" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

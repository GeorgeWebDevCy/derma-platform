import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getDictionary, getLanguageFromCookie } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

export default async function LandingPage() {
    const lang = await getLanguageFromCookie()
    const t = getDictionary(lang)

    const highlights = t.landing.highlights
    const steps = t.landing.steps.items
    const testimonials = t.landing.outcomes.testimonials

    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-white">
            <header className="relative z-20 flex h-16 items-center border-b border-white/10 px-4 backdrop-blur md:px-10">
                <Link className="flex items-center gap-3" href="#">
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 shadow-lg shadow-emerald-500/30" />
                    <span className="text-xl font-semibold tracking-tight">{t.common.brand}</span>
                </Link>
                <nav className="ml-auto flex items-center gap-4 text-sm font-medium text-white/80 sm:gap-8">
                    <Link className="transition hover:text-white" href="#features">
                        {t.common.nav.features}
                    </Link>
                    <Link className="transition hover:text-white" href="#doctors">
                        {t.common.nav.doctors}
                    </Link>
                    <Link className="transition hover:text-white" href="/auth/login">
                        {t.common.nav.signin}
                    </Link>
                    <Link href="/auth/doctor/signup">
                        <Button className="bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                            {t.common.nav.joinDoctor}
                        </Button>
                    </Link>
                    <LanguageSwitcher current={lang} />
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
                                    {t.landing.hero.eyebrow}
                                </div>
                                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                    {t.landing.hero.title}
                                </h1>
                                <p className="max-w-2xl text-lg text-slate-200/80 sm:text-xl">
                                    {t.landing.hero.subtitle}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/auth/login">
                                        <Button className="h-12 rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 px-6 text-base font-semibold text-slate-950 shadow-xl shadow-emerald-500/30 transition hover:scale-[1.02]">
                                            {t.landing.hero.primary}
                                        </Button>
                                    </Link>
                                    <Link href="/auth/doctor/signup">
                                        <Button variant="outline" className="h-12 rounded-xl border-white/30 bg-white/5 px-6 text-base font-semibold text-white transition hover:border-white hover:bg-white/10">
                                            {t.landing.hero.secondary}
                                        </Button>
                                    </Link>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    {t.landing.hero.stats.map((item) => (
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
                                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200">{t.landing.whyTitle}</p>
                                <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{t.landing.whyHeading}</h2>
                                <p className="max-w-2xl text-lg text-white/70">{t.landing.whyCopy}</p>
                            </div>
                            <div className="flex gap-4 text-sm text-white/70">
                                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    {t.landing.whyBadges[0]}
                                </div>
                                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                                    {t.landing.whyBadges[1]}
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
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">{t.landing.nav?.doctors ?? t.common.nav.doctors}</p>
                                <h2 className="text-3xl font-bold sm:text-4xl">{t.landing.steps.title}</h2>
                                <p className="text-lg text-white/70">{t.landing.whyCopy}</p>
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
                                <h2 className="text-3xl font-bold sm:text-4xl">{t.landing.outcomes.title}</h2>
                                <p className="max-w-2xl text-lg text-white/70">{t.landing.outcomes.subtitle}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/80">
                                {t.landing.outcomes.metrics.map((metric) => (
                                    <div key={metric.label}>
                                        <p className="text-3xl font-bold text-white">{metric.value}</p>
                                        <p className="text-sm">{metric.label}</p>
                                    </div>
                                ))}
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
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100">{t.landing.cta.eyebrow}</p>
                                <h2 className="text-3xl font-bold sm:text-4xl">{t.landing.cta.title}</h2>
                                <p className="mx-auto max-w-2xl text-lg text-white/80">{t.landing.cta.subtitle}</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/auth/login">
                                    <Button className="h-12 rounded-xl bg-white text-base font-semibold text-slate-900 shadow-lg transition hover:-translate-y-[2px]">
                                        {t.landing.cta.patient}
                                    </Button>
                                </Link>
                                <Link href="/auth/doctor/signup">
                                    <Button variant="outline" className="h-12 rounded-xl border-white/40 bg-white/10 text-base font-semibold text-white transition hover:border-white hover:bg-white/20">
                                        {t.landing.cta.doctor}
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

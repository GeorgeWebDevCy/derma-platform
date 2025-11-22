import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { getDictionary, getLanguageFromCookie } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

export default async function LoginPage() {
    const lang = await getLanguageFromCookie()
    const t = getDictionary(lang)

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_45%)]" aria-hidden />
            <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden />
            <div className="absolute right-[-5%] bottom-[-5%] h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" aria-hidden />

            <div className="relative w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                            {t.common.brand}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{t.auth.loginTitle}</h1>
                            <p className="text-sm text-white/70">{t.auth.loginSubtitle}</p>
                        </div>
                    </div>
                    <LanguageSwitcher current={lang} />
                </div>

                <form
                    action={async (formData) => {
                        "use server"
                        await signIn("resend", formData)
                    }}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {t.auth.emailLabel}
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            className="flex h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                        />
                    </div>
                    <Button type="submit" className="w-full h-11 rounded-md bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/30 hover:scale-[1.01] transition">
                        {t.auth.submit}
                    </Button>
                </form>

                <p className="text-xs text-white/50">
                    We’ll send a magic link to your email. By continuing you agree to our {t.common.terms} and {t.common.privacy}.
                </p>
            </div>
        </div>
    )
}

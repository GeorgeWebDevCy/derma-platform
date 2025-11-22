import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { getDictionary, getLanguageFromCookie } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

export default async function LoginPage() {
    const lang = await getLanguageFromCookie()
    const t = getDictionary(lang)

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{t.auth.loginTitle}</h1>
                        <p className="text-gray-500 dark:text-gray-400">{t.auth.loginSubtitle}</p>
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
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {t.auth.submit}
                    </Button>
                </form>
            </div>
        </div>
    )
}

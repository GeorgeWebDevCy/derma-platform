'use client'

import { useTransition } from "react"
import { setLanguage } from "@/app/actions"
import type { Lang } from "@/lib/i18n"

const languages: { value: Lang; label: string }[] = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "el", label: "Ελληνικά" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "pt", label: "Português" },
    { value: "it", label: "Italiano" },
    { value: "nl", label: "Nederlands" },
    { value: "tr", label: "Türkçe" },
    { value: "hi", label: "हिन्दी" },
    { value: "ja", label: "日本語" },
    { value: "zh", label: "中文" },
]

export function LanguageSwitcher({ current }: { current: Lang }) {
    const [pending, startTransition] = useTransition()

    return (
        <div className="flex items-center gap-2 text-sm">
            <label className="sr-only" htmlFor="lang">
                Language
            </label>
            <select
                id="lang"
                className="h-9 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={current}
                disabled={pending}
                onChange={(e) => {
                    const next = e.target.value as Lang
                    startTransition(() => setLanguage(next))
                }}
            >
                {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

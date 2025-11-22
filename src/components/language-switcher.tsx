'use client'

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, useTransition } from "react"
import { setLanguage } from "@/app/actions"
import type { Lang } from "@/lib/i18n"
import "flag-icons/css/flag-icons.min.css"

const languages: { value: Lang; label: string; flag: string }[] = [
    { value: "en", label: "English", flag: "us" },
    { value: "el", label: "Ελληνικά", flag: "gr" },
    { value: "es", label: "Español", flag: "es" },
    { value: "fr", label: "Français", flag: "fr" },
    { value: "de", label: "Deutsch", flag: "de" },
    { value: "pt", label: "Português", flag: "pt" },
    { value: "it", label: "Italiano", flag: "it" },
    { value: "nl", label: "Nederlands", flag: "nl" },
    { value: "tr", label: "Türkçe", flag: "tr" },
    { value: "hi", label: "हिन्दी", flag: "in" },
    { value: "ja", label: "日本語", flag: "jp" },
    { value: "zh", label: "中文", flag: "cn" },
]

export function LanguageSwitcher({ current }: { current: Lang }) {
    const [pending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const menuRef = useRef<HTMLDivElement>(null)
    const currentLang = languages.find((l) => l.value === current) ?? languages[0]

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", onClickOutside)
        return () => document.removeEventListener("mousedown", onClickOutside)
    }, [])

    return (
        <div className="relative text-sm text-white" ref={menuRef}>
            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-2 py-1 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                onClick={() => setOpen((v) => !v)}
                disabled={pending}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={`fi fi-${currentLang.flag} h-4 w-6 rounded`} aria-hidden />
                <span className="truncate max-w-[6rem]">{currentLang.label}</span>
                <span className="text-white/60" aria-hidden>
                    ▾
                </span>
            </button>
            {open && (
                <div className="absolute right-0 z-30 mt-2 w-48 rounded-md border border-white/15 bg-slate-900/90 backdrop-blur shadow-lg">
                    <ul className="max-h-64 overflow-y-auto p-1" role="listbox">
                        {languages.map((lang) => (
                            <li key={lang.value}>
                                <button
                                    type="button"
                                    className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition ${
                                        lang.value === current
                                            ? "bg-emerald-500/10 text-white"
                                            : "text-white/80 hover:bg-white/10"
                                    }`}
                                    onClick={() => {
                                        setOpen(false)
                                        if (lang.value === current || pending) return
                                        startTransition(async () => {
                                            await setLanguage(lang.value)
                                            router.refresh()
                                        })
                                    }}
                                    role="option"
                                    aria-selected={lang.value === current}
                                >
                                    <span className={`fi fi-${lang.flag} h-4 w-6 rounded`} aria-hidden />
                                    <span className="truncate">{lang.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

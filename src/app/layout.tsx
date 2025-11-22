import type { Metadata } from "next"
import { ReactNode } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { getLanguageFromCookie } from "@/lib/i18n"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "DermaConnect",
    description: "Global dermatology platform built with Next.js and Prisma",
}

export default async function RootLayout({ children }: { children: ReactNode }) {
    const lang = await getLanguageFromCookie()
    return (
        <html lang={lang}>
            <body className={inter.className}>{children}</body>
        </html>
    )
}

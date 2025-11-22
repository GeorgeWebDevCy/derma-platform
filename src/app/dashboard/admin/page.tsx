import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getDictionary, getLanguageFromCookie } from "@/lib/i18n"
import { DonutChart, Legend } from "@/components/charts"

export default async function AdminDashboard() {
    const session = await auth()
    if (!session) redirect("/auth/login")
    if (session.user?.role !== "admin") redirect("/dashboard")

    const lang = await getLanguageFromCookie()
    const t = getDictionary(lang)

    const [usersCount, doctorsCount, patientsCount, consultationsCount, pendingCount, assignedCount, completedCount, cancelledCount, recent] =
        await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { role: "doctor" } }),
            prisma.user.count({ where: { role: "patient" } }),
            prisma.consultation.count(),
            prisma.consultation.count({ where: { status: "pending" } }),
            prisma.consultation.count({ where: { status: "assigned" } }),
            prisma.consultation.count({ where: { status: "completed" } }),
            prisma.consultation.count({ where: { status: "cancelled" } }),
            prisma.consultation.findMany({
                take: 6,
                orderBy: { createdAt: "desc" },
                include: { patient: true, doctor: true },
            }),
        ])

    const totalForBar = pendingCount + assignedCount + completedCount + cancelledCount || 1
    const bar = (value: number) => `${Math.max(8, (value / totalForBar) * 100)}%`
    const donutSegments = [
        { label: t.admin.metrics.pending, value: pendingCount, color: "#fbbf24" },
        { label: t.admin.metrics.assigned, value: assignedCount, color: "#06b6d4" },
        { label: t.admin.metrics.completed, value: completedCount, color: "#10b981" },
        { label: "Cancelled", value: cancelledCount, color: "#f87171" },
    ]

    return (
        <div className="space-y-6">
            <header>
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">{t.admin.title}</p>
                <h1 className="text-3xl font-bold text-white">{t.admin.subtitle}</h1>
            </header>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard label={t.admin.metrics.users} value={usersCount} />
                <StatCard label={t.admin.metrics.doctors} value={doctorsCount} />
                <StatCard label={t.admin.metrics.patients} value={patientsCount} />
                <StatCard label={t.admin.metrics.consultations} value={consultationsCount} />
            </div>

            <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Consultation pipeline</h2>
                        <span className="text-xs text-white/60">Last 6 statuses</span>
                    </div>
                    <div className="mt-4 space-y-3">
                        <Bar label={t.admin.metrics.pending} value={pendingCount} width={bar(pendingCount)} tone="amber" />
                        <Bar label={t.admin.metrics.assigned} value={assignedCount} width={bar(assignedCount)} tone="cyan" />
                        <Bar label={t.admin.metrics.completed} value={completedCount} width={bar(completedCount)} tone="emerald" />
                        <Bar label="Cancelled" value={cancelledCount} width={bar(cancelledCount)} tone="red" />
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg">
                    <h2 className="text-lg font-semibold text-white">Status split</h2>
                    <div className="flex items-center gap-4">
                        <DonutChart segments={donutSegments} size={160} strokeWidth={24} />
                        <Legend segments={donutSegments} />
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg">
                <h2 className="text-lg font-semibold text-white">{t.admin.recent}</h2>
                <div className="mt-3 space-y-3">
                    {recent.map((c) => (
                        <div key={c.id} className="rounded-md border border-white/5 bg-white/5 p-3">
                            <div className="flex items-center justify-between text-xs text-white/70">
                                <span>{t.admin.status}: {c.status}</span>
                                <span>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(c.createdAt)}</span>
                            </div>
                            <p className="mt-1 text-sm text-white">{c.description || "No description"}</p>
                            <p className="text-xs text-white/60">
                                {t.admin.patient}: {c.patient?.email ?? "Unassigned"}
                            </p>
                            <p className="text-xs text-white/60">
                                {t.admin.doctor}: {c.doctor?.email ?? "Unassigned"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow">
            <p className="text-sm text-white/60">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    )
}

function Bar({ label, value, width, tone }: { label: string; value: number; width: string; tone: "amber" | "cyan" | "emerald" | "red" }) {
    const colors: Record<typeof tone, string> = {
        amber: "from-amber-400/60 to-amber-500/60",
        cyan: "from-cyan-400/60 to-cyan-500/60",
        emerald: "from-emerald-400/60 to-emerald-500/60",
        red: "from-red-400/60 to-red-500/60",
    }
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between text-sm text-white/80">
                <span>{label}</span>
                <span className="text-white/60">{value}</span>
            </div>
            <div className="h-3 w-full rounded-full bg-white/5">
                <div
                    className={`h-3 rounded-full bg-gradient-to-r ${colors[tone]} shadow-inner`}
                    style={{ width }}
                    aria-label={`${label} ${value}`}
                />
            </div>
        </div>
    )
}

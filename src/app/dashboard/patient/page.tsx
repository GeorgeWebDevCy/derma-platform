import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { requestConsultation } from "@/app/actions"
import { prisma } from "@/lib/prisma"

export default async function PatientDashboard() {
    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    if (session.user?.role !== "patient") {
        redirect("/dashboard/doctor")
    }

    const consultations = await prisma.consultation.findMany({
        where: { patientId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: { doctor: { include: { doctorProfile: true } } },
    })

    const assignedDoctor = consultations.find((c) => c.doctor)?.doctor

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Patient Dashboard</h1>
                <form action={requestConsultation} className="flex flex-col gap-2 md:flex-row md:items-center md:flex-wrap">
                    <input
                        name="description"
                        placeholder="Brief summary"
                        className="h-10 w-full md:w-48 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <input
                        name="symptoms"
                        placeholder="Key symptoms (e.g. itch, redness)"
                        className="h-10 w-full md:w-56 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <input
                        name="duration"
                        placeholder="Duration (e.g. 3 days)"
                        className="h-10 w-full md:w-40 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <textarea
                        name="images"
                        rows={2}
                        placeholder="Image URLs (one per line)"
                        className="w-full md:w-[22rem] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <Button className="bg-emerald-600 hover:bg-emerald-700 md:self-stretch">Request Consultation</Button>
                </form>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-50 p-6">
                    <h3 className="font-semibold leading-none tracking-tight">My Care Team</h3>
                    <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <p>Assigned dermatologist: {assignedDoctor ? assignedDoctor.email ?? "Assigned" : "Not yet assigned"}</p>
                        <p>Status: {consultations.some((c) => c.status === "pending" || c.status === "assigned") ? "Active" : "Idle"}</p>
                    </div>
                </div>

                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-50 p-6">
                    <h3 className="font-semibold leading-none tracking-tight">Recent Consultations</h3>
                    {consultations.length === 0 ? (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">No consultations yet.</p>
                    ) : (
                        <div className="mt-4 space-y-3">
                            {consultations.map((consultation) => {
                                const images = consultation.images ? (JSON.parse(consultation.images) as string[]) : []
                                return (
                                <div key={consultation.id} className="rounded-md border bg-gray-50 dark:bg-gray-900 p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold uppercase tracking-wide rounded-full bg-gray-200 px-2 py-1 text-gray-700 dark:bg-gray-700 dark:text-gray-100">
                                            {consultation.status}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(consultation.createdAt)}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        {consultation.description || "No description"}
                                    </p>
                                    {consultation.symptoms && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Symptoms: {consultation.symptoms}</p>
                                    )}
                                    {consultation.duration && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Duration: {consultation.duration}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Doctor: {consultation.doctor?.doctorProfile?.specialty ? `${consultation.doctor.doctorProfile.specialty} — ` : ""}{consultation.doctor?.email ?? "Not assigned"}
                                    </p>
                                    {consultation.notes && (
                                        <p className="mt-2 rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-100">
                                            Doctor notes: {consultation.notes}
                                        </p>
                                    )}
                                    {images.length > 0 && (
                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                            {images.map((url) => (
                                                <a
                                                    key={url}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="block overflow-hidden rounded-md border"
                                                >
                                                    <div className="relative h-24 w-full">
                                                        {/* Use plain div as placeholder; replace with next/image when URLs are trusted and allowlist is set. */}
                                                        <span className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                                                            View image
                                                        </span>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

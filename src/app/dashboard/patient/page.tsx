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
        include: { doctor: true },
    })

    const assignedDoctor = consultations.find((c) => c.doctor)?.doctor

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Patient Dashboard</h1>
                <form action={requestConsultation} className="flex gap-2">
                    <input
                        name="description"
                        placeholder="e.g. Skin rash, 2 days"
                        className="hidden md:block h-10 w-64 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Request Consultation</Button>
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
                            {consultations.map((consultation) => (
                                <div key={consultation.id} className="rounded-md border bg-gray-50 dark:bg-gray-900 p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold capitalize">{consultation.status}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(consultation.createdAt)}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        {consultation.description || "No description"}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Doctor: {consultation.doctor?.email ?? "Not assigned"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

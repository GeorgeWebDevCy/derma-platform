import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { acceptConsultation, completeConsultation } from "@/app/actions"

export default async function DoctorDashboard() {
    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    if (session.user?.role !== "doctor") {
        redirect("/dashboard/patient")
    }

    const [incoming, myConsultations] = await Promise.all([
        prisma.consultation.findMany({
            where: { status: "pending" },
            include: { patient: true },
            orderBy: { createdAt: "asc" },
        }),
        prisma.consultation.findMany({
            where: { doctorId: session.user.id },
            include: { patient: true },
            orderBy: { createdAt: "desc" },
        }),
    ])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Doctor Workspace</h1>
                <div className="flex gap-2">
                    <Button variant="outline">Unavailable</Button>
                    <Button className="bg-green-600 hover:bg-green-700">Go Online</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-50 p-6">
                    <h3 className="font-semibold leading-none tracking-tight">Incoming Requests</h3>
                    {incoming.length === 0 ? (
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">No pending requests.</p>
                    ) : (
                        <div className="mt-4 space-y-4">
                            {incoming.map((consultation) => (
                                <div key={consultation.id} className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
                                    <p className="text-sm font-medium">
                                        {consultation.patient?.email ?? "Patient"} — {consultation.description || "No description"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Requested {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(consultation.createdAt)}
                                    </p>
                                    <form action={acceptConsultation} className="mt-2">
                                        <input type="hidden" name="consultationId" value={consultation.id} />
                                        <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                                            Accept Request
                                        </Button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-50 p-6">
                    <h3 className="font-semibold leading-none tracking-tight">My Consultations</h3>
                    {myConsultations.length === 0 ? (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">No assigned consultations.</p>
                    ) : (
                        <div className="mt-4 space-y-4">
                            {myConsultations.map((consultation) => (
                                <div key={consultation.id} className="rounded-md border bg-gray-50 dark:bg-gray-900 p-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold">{consultation.patient?.email ?? "Patient"}</p>
                                        <span className="text-xs capitalize text-gray-500">{consultation.status}</span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        {consultation.description || "No description"}
                                    </p>
                                    {consultation.status !== "completed" && (
                                        <form action={completeConsultation} className="mt-2">
                                            <input type="hidden" name="consultationId" value={consultation.id} />
                                            <Button size="sm" variant="outline" className="w-full">
                                                Mark Completed
                                            </Button>
                                        </form>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

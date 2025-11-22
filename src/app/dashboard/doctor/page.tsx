import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { acceptConsultation, completeConsultation, releaseConsultation, setDoctorAvailability, upsertDoctorProfile, updateConsultationNotes } from "@/app/actions"

export default async function DoctorDashboard() {
    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    if (session.user?.role !== "doctor") {
        redirect("/dashboard/patient")
    }

    const [incoming, myConsultations, doctorProfile] = await Promise.all([
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
        prisma.doctorProfile.findUnique({ where: { userId: session.user.id } }),
    ])

    const incomingVisible = doctorProfile?.isAvailable ? incoming : []

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Doctor Workspace</h1>
                <div className="flex gap-2">
                    <form action={setDoctorAvailability}>
                        <input type="hidden" name="status" value="offline" />
                        <Button variant={doctorProfile?.isAvailable ? "outline" : "default"}>
                            {doctorProfile?.isAvailable ? "Go Offline" : "Unavailable"}
                        </Button>
                    </form>
                    <form action={setDoctorAvailability}>
                        <input type="hidden" name="status" value="online" />
                        <Button className="bg-green-600 hover:bg-green-700" variant={doctorProfile?.isAvailable ? "default" : "outline"}>
                            Go Online
                        </Button>
                    </form>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-50 p-6">
                    <h3 className="font-semibold leading-none tracking-tight">Incoming Requests</h3>
                    {incomingVisible.length === 0 ? (
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                            {doctorProfile?.isAvailable ? "No pending requests." : "Go online to view and accept pending requests."}
                        </p>
                    ) : (
                        <div className="mt-4 space-y-4">
                            {incomingVisible.map((consultation) => (
                                <ConsultationCardPending key={consultation.id} consultation={consultation} isAvailable={doctorProfile?.isAvailable ?? false} />
                            ))}
                        </div>
                    )}
                    {!doctorProfile?.isAvailable && (
                        <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                            You are offline; set yourself online to accept new consultations.
                        </p>
                    )}
                </div>

                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-50 p-6">
                    <h3 className="font-semibold leading-none tracking-tight">My Consultations</h3>
                    {myConsultations.length === 0 ? (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">No assigned consultations.</p>
                    ) : (
                        <div className="mt-4 space-y-4">
                            {myConsultations.map((consultation) => (
                                <ConsultationCardAssigned key={consultation.id} consultation={consultation} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-50 p-6">
                    <h3 className="font-semibold leading-none tracking-tight">My Profile</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Keep your specialty and bio current; patients will see this when assigned.
                    </p>
                    <form action={upsertDoctorProfile} className="mt-4 space-y-3">
                        <div className="space-y-1">
                            <label className="text-sm font-medium" htmlFor="specialty">Specialty</label>
                            <input
                                id="specialty"
                                name="specialty"
                                defaultValue={doctorProfile?.specialty ?? ""}
                                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium" htmlFor="bio">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows={3}
                                defaultValue={doctorProfile?.bio ?? ""}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>
                        <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Save profile
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

function ConsultationCardPending({ consultation, isAvailable }: { consultation: any; isAvailable: boolean }) {
    const images = consultation.images ? (JSON.parse(consultation.images) as string[]) : []
    return (
        <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900 space-y-2">
            <p className="text-sm font-medium">
                {consultation.patient?.email ?? "Patient"} — {consultation.description || "No description"}
            </p>
            <p className="text-xs text-gray-500">
                Requested {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(consultation.createdAt)}
            </p>
            {consultation.symptoms && (
                <p className="text-xs text-gray-500">Symptoms: {consultation.symptoms}</p>
            )}
            {consultation.duration && (
                <p className="text-xs text-gray-500">Duration: {consultation.duration}</p>
            )}
            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                    {images.map((url) => (
                        <a key={url} href={url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-md border">
                            <div className="relative h-20 w-full">
                                <span className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                                    View image
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            )}
            <form action={acceptConsultation} className="pt-1">
                <input type="hidden" name="consultationId" value={consultation.id} />
                <Button
                    size="sm"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={!isAvailable}
                    title={isAvailable ? undefined : "Set yourself online to accept requests"}
                >
                    Accept Request
                </Button>
            </form>
        </div>
    )
}

function ConsultationCardAssigned({ consultation }: { consultation: any }) {
    const images = consultation.images ? (JSON.parse(consultation.images) as string[]) : []
    return (
        <div className="rounded-md border bg-gray-50 dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{consultation.patient?.email ?? "Patient"}</p>
                <span className="text-xs capitalize text-gray-500">{consultation.status}</span>
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
            {images.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                    {images.map((url) => (
                        <a key={url} href={url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-md border">
                            <div className="relative h-20 w-full">
                                <span className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
                                    View image
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            )}
            {consultation.notes && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Notes: {consultation.notes}</p>
            )}
            <form action={updateConsultationNotes} className="mt-3 space-y-2">
                <input type="hidden" name="consultationId" value={consultation.id} />
                <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Notes</label>
                <textarea
                    name="notes"
                    defaultValue={consultation.notes ?? ""}
                    rows={2}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Add assessment / plan"
                />
                <Button type="submit" size="sm" variant="outline" className="w-full">
                    Save notes
                </Button>
            </form>
            {consultation.status === "assigned" && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                    <form action={releaseConsultation}>
                        <input type="hidden" name="consultationId" value={consultation.id} />
                        <Button size="sm" variant="outline" className="w-full">
                            Release to queue
                        </Button>
                    </form>
                    <form action={completeConsultation}>
                        <input type="hidden" name="consultationId" value={consultation.id} />
                        <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                            Mark Completed
                        </Button>
                    </form>
                </div>
            )}
        </div>
    )
}

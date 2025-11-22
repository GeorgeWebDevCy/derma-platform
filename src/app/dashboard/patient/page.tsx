import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { requestConsultation } from "@/app/actions"

export default async function PatientDashboard() {
    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    if (session.user?.role !== "patient") {
        redirect("/dashboard/doctor")
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Patient Dashboard</h1>
                <form action={requestConsultation}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Request Consultation</Button>
                </form>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold leading-none tracking-tight">My Care Team</h3>
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <p>Assigned dermatologist: Not yet assigned</p>
                        <p>Status: Active</p>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold leading-none tracking-tight">Recent Consultations</h3>
                    <p className="text-sm text-muted-foreground mt-2">No recent consultations.</p>
                </div>
            </div>
        </div>
    )
}

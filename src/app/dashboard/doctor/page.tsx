import { auth } from "@/auth"
import { Button } from "@/components/ui/button"

export default async function DoctorDashboard() {
    const session = await auth()

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
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold leading-none tracking-tight">Incoming Requests</h3>
                    <div className="mt-4 space-y-4">
                        <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
                            <p className="text-sm font-medium">Patient #1234</p>
                            <p className="text-xs text-gray-500">Skin rash, duration 2 days.</p>
                            <Button size="sm" className="mt-2 w-full">Accept Request</Button>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold leading-none tracking-tight">My Schedule</h3>
                    <p className="text-sm text-muted-foreground mt-2">You have no scheduled follow-ups.</p>
                </div>
            </div>
        </div>
    )
}

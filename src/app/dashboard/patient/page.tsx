import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { requestConsultation } from "@/app/actions"

export default async function PatientDashboard() {
    const session = await auth()

    if (session?.user?.role !== "patient") {
                        ● Active
                    </div >
                </div >

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="font-semibold leading-none tracking-tight">Recent Consultations</h3>
                <p className="text-sm text-muted-foreground mt-2">No recent consultations.</p>
            </div>
            </div >
        </div >
    )
    }

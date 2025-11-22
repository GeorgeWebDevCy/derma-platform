import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardLanding() {
    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    if (session.user?.role === "admin") {
        redirect("/dashboard/admin")
    }

    if (session.user?.role === "doctor") {
        redirect("/dashboard/doctor")
    }

    redirect("/dashboard/patient")
}

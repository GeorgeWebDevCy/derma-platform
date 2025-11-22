import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { upsertDoctorProfile } from "@/app/actions"
import { SPECIALTIES } from "@/lib/i18n"

export default async function DoctorSignupPage() {
    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    if (session.user.role !== "doctor") {
        redirect("/dashboard/patient")
    }

    const doctorProfile = await prisma.doctorProfile.findUnique({
        where: { userId: session.user.id },
    })

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-xl space-y-6 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <div className="space-y-2 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">Partner with us</p>
                    <h1 className="text-3xl font-bold">Doctor onboarding</h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Share your profile details. We will review and verify your account before assigning consultations.
                    </p>
                </div>
                <form action={upsertDoctorProfile} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="specialty" className="text-sm font-medium leading-none">
                            Specialty
                        </label>
                        <select
                            id="specialty"
                            name="specialty"
                            defaultValue={doctorProfile?.specialty ?? ""}
                            className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="">Select your specialty</option>
                            {SPECIALTIES.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="bio" className="text-sm font-medium leading-none">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            defaultValue={doctorProfile?.bio ?? ""}
                            placeholder="Brief professional summary, languages, clinic affiliations."
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Save profile
                    </Button>
                </form>
                <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                    Need help?{" "}
                    <Link href="/auth/login" className="font-semibold text-emerald-600 hover:underline">
                        Contact support
                    </Link>
                </div>
            </div>
        </div>
    )
}

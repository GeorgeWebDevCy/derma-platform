import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DoctorSignupPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-xl space-y-6 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <div className="space-y-2 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">Partner with us</p>
                    <h1 className="text-3xl font-bold">Join as a dermatologist</h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        We are building the onboarding flow. Share your email and we will notify you when verification opens.
                    </p>
                </div>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none">
                            Work email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@clinic.com"
                            className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="country" className="text-sm font-medium leading-none">
                            Country / Region
                        </label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            placeholder="e.g. United Kingdom"
                            className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <Button type="button" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Save & Notify Me
                    </Button>
                </form>
                <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                    Already have an invite?{" "}
                    <Link href="/auth/login" className="font-semibold text-emerald-600 hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    )
}

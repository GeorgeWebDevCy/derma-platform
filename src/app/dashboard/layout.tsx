import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) {
        redirect("/auth/login")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                <Link className="flex items-center gap-2 font-semibold" href="#">
                    <span className="">DermaConnect</span>
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {session.user?.email} ({session.user?.role})
                    </span>
                    <form
                        action={async () => {
                            "use server"
                            // In a real app, import signOut from auth and call it
                            // await signOut()
                            // For now, just redirect to home as a mock signout
                            redirect("/")
                        }}
                    >
                        <Button size="sm" variant="outline">Sign Out</Button>
                    </form>
                </div>
            </header>
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    )
}

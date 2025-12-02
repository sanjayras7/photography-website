import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/admin/login")
    }

    return (
        <div className="flex min-h-screen font-sans">
            <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col fixed h-full">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold tracking-wider">ADMIN</h1>
                    <p className="text-xs text-slate-400 mt-1">Photography Portfolio</p>
                </div>

                <nav className="space-y-2 flex-1">
                    <NavLink href="/admin/dashboard">Dashboard</NavLink>
                    <NavLink href="/admin/hero">Hero Section</NavLink>
                    <NavLink href="/admin/showcase">Showcase</NavLink>
                    <NavLink href="/admin/gallery">Gallery</NavLink>
                    <NavLink href="/admin/albums">Albums</NavLink>
                </nav>

                <div className="pt-6 border-t border-slate-800">
                    <Link href="/" className="text-sm text-slate-400 hover:text-white flex items-center gap-2">
                        ← View Site
                    </Link>
                </div>
            </aside>
            <main className="flex-1 p-10 bg-slate-50 ml-64 min-h-screen">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="block px-4 py-2.5 rounded-lg transition-colors hover:bg-slate-800 text-slate-300 hover:text-white"
        >
            {children}
        </Link>
    )
}

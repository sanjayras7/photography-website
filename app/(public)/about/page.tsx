import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
    const title = await prisma.textContent.findUnique({ where: { key: 'ABOUT_TITLE' } })
    const text = await prisma.textContent.findUnique({ where: { key: 'ABOUT_TEXT' } })

    return (
        <div className="min-h-screen bg-white pt-12 pb-24 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-12 text-center">
                    {title?.value || "About Me"}
                </h1>
                <div className="prose prose-xl mx-auto text-gray-600 leading-relaxed font-light whitespace-pre-wrap">
                    {text?.value || "I am a photographer passionate about capturing life's most precious moments."}
                </div>
            </div>
        </div>
    )
}

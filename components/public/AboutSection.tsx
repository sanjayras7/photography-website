import { prisma } from "@/lib/prisma"

export default async function AboutSection() {
    const title = await prisma.textContent.findUnique({ where: { key: 'ABOUT_TITLE' } })
    const text = await prisma.textContent.findUnique({ where: { key: 'ABOUT_TEXT' } })

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
                    {title?.value || "About Me"}
                </h2>
                <div className="prose prose-base md:prose-lg mx-auto text-gray-600 leading-relaxed font-light whitespace-pre-wrap">
                    {text?.value || "I am a photographer passionate about capturing life's most precious moments."}
                </div>
            </div>
        </section>
    )
}

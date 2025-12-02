import { prisma } from "@/lib/prisma"
import Image from "next/image"

export default async function ShowcaseSection() {
    const images = await prisma.image.findMany({
        where: { section: 'SHOWCASE' },
        orderBy: { orderIndex: 'asc' },
        take: 3,
    })

    if (images.length === 0) return null

    return (
        <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {images.map((img, idx) => (
                    <div key={img.id} className={`relative aspect-[3/4] w-full ${idx === 1 ? 'md:-mt-16 md:mb-16 shadow-2xl z-10' : 'shadow-lg'}`}>
                        <Image
                            src={img.url}
                            alt="Showcase"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

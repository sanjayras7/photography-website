import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"

export default async function GalleryPreview() {
    const images = await prisma.image.findMany({
        where: { section: 'GALLERY' },
        orderBy: { orderIndex: 'asc' },
        take: 8,
    })

    return (
        <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Best Moments Captured</h2>
                <Link href="/gallery" className="text-sm border-b border-black pb-1 hover:text-gray-600 transition-colors uppercase tracking-widest">
                    View Full Gallery
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img) => (
                    <div key={img.id} className="relative aspect-square group overflow-hidden bg-gray-100">
                        <Image
                            src={img.url}
                            alt="Gallery"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

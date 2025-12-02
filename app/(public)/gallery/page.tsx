import { prisma } from "@/lib/prisma"
import Image from "next/image"

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
    const images = await prisma.image.findMany({
        where: {
            OR: [
                { section: 'GALLERY' },
                { section: 'ALBUM' }
            ]
        },
        orderBy: { orderIndex: 'asc' },
    })

    const galleryImages = images.filter(img => img.section === 'GALLERY')
    const albumImages = images.filter(img => img.section === 'ALBUM')

    const albums: Record<string, typeof images> = {}
    albumImages.forEach(img => {
        if (img.albumId) {
            if (!albums[img.albumId]) albums[img.albumId] = []
            albums[img.albumId].push(img)
        }
    })

    return (
        <div className="min-h-screen bg-white pb-16 md:pb-24">
            <div className="pt-8 pb-16 md:pt-12 md:pb-24 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Portfolio</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    A collection of moments frozen in time.
                </p>
            </div>

            {/* Main Gallery */}
            {galleryImages.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 mb-24">
                    <h2 className="text-2xl font-serif font-bold mb-8 text-center">Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryImages.map((img) => (
                            <div key={img.id} className="relative aspect-[4/5] group overflow-hidden bg-gray-100">
                                <Image
                                    src={img.url}
                                    alt="Gallery"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Albums */}
            {Object.entries(albums).map(([albumName, imgs]) => (
                <div key={albumName} className="max-w-7xl mx-auto px-6 mb-24">
                    <h2 className="text-2xl font-serif font-bold mb-8 text-center">{albumName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {imgs.map((img) => (
                            <div key={img.id} className="relative aspect-[4/5] group overflow-hidden bg-gray-100">
                                <Image
                                    src={img.url}
                                    alt={albumName}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

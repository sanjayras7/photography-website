import Image from "next/image";
import SectionTitle from "./SectionTitle";

const galleryImages = [
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    "/images/gallery-3.jpg",
    "/images/gallery-4.jpg",
    "/images/gallery-5.jpg",
    "/images/gallery-6.jpg",
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    "/images/gallery-3.jpg",
    "/images/gallery-4.jpg",
    "/images/gallery-5.jpg",
    "/images/gallery-6.jpg",
];

export default function GallerySection() {
    return (
        <section id="portfolio" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <SectionTitle title="Best Moments Captured" />

                <div className="columns-2 md:columns-4 gap-4 space-y-4">
                    {galleryImages.map((src, index) => (
                        <div key={index} className="relative break-inside-avoid overflow-hidden group">
                            <Image
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                width={500}
                                height={500}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

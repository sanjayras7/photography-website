import { prisma } from "@/lib/prisma"
import Image from "next/image"

export default async function HeroSection() {
    const heroImage = await prisma.image.findFirst({
        where: { section: 'HERO' },
    })

    const title = await prisma.textContent.findUnique({ where: { key: 'HERO_TITLE' } })
    const subtitle = await prisma.textContent.findUnique({ where: { key: 'HERO_SUBTITLE' } })

    return (
        <section className="relative h-[100dvh] w-full overflow-hidden">
            {heroImage ? (
                <Image
                    src={heroImage.url}
                    alt="Hero"
                    fill
                    className="object-cover"
                    priority
                />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Hero Image Set</span>
                </div>
            )}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-4 md:mb-6 tracking-tight drop-shadow-lg">
                    {title?.value || "Capturing Moments"}
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-light tracking-wide max-w-xs sm:max-w-2xl opacity-90 drop-shadow-md">
                    {subtitle?.value || "Timeless photography for the modern soul."}
                </p>
            </div>
        </section>
    )
}

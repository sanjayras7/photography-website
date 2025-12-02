import HeroSection from "@/components/public/HeroSection"
import ShowcaseSection from "@/components/public/ShowcaseSection"
import AboutSection from "@/components/public/AboutSection"
import GalleryPreview from "@/components/public/GalleryPreview"

export const dynamic = 'force-dynamic'

export default function HomePage() {
    return (
        <div className="bg-white">
            <HeroSection />
            <ShowcaseSection />
            <AboutSection />
            <GalleryPreview />
        </div>
    )
}

import Image from "next/image";

export default function ThreeImageShowcase() {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Image - Portrait */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <Image
                            src="/images/showcase-1.jpg"
                            alt="Portrait"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Middle Image - Texture/Plant */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <Image
                            src="/images/showcase-2.jpg"
                            alt="Details"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Right Image - Couple */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <Image
                            src="/images/showcase-3.jpg"
                            alt="Couple"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

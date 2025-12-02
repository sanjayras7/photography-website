import SectionTitle from "./SectionTitle";

export default function AboutSection() {
    return (
        <section id="about" className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <SectionTitle
                        title="Why Atoms Photography?"
                        subtitle="Capturing Timeless Moments with Heartfelt, Stunning Visuals"
                    />
                    <p className="text-gray-600 leading-relaxed font-sans text-lg mt-8">
                        We believe that every love story deserves to be told with authenticity and grace.
                        Our approach is rooted in capturing the raw emotions, the quiet glances, and the
                        joyous celebrations that make your day unique. With a keen eye for detail and a
                        passion for storytelling, we turn fleeting moments into cherished memories that
                        last a lifetime.
                    </p>
                </div>
            </div>
        </section>
    );
}

import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full h-[90vh] overflow-hidden">
            <Image
                src="/images/hero.jpg"
                alt="Wedding Couple"
                fill
                priority
                className="object-cover object-center"
            />
        </section>
    );
}

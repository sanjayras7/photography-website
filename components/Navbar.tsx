import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100 py-6">
            <div className="container mx-auto px-4 flex justify-center items-center">
                <div className="flex space-x-12 text-sm tracking-widest font-serif text-gray-800">
                    <Link href="/" className="hover:text-gray-500 transition-colors uppercase">
                        Home
                    </Link>
                    <Link href="#about" className="hover:text-gray-500 transition-colors uppercase">
                        About Us
                    </Link>
                    <Link href="#portfolio" className="hover:text-gray-500 transition-colors uppercase">
                        Portfolio
                    </Link>
                </div>
            </div>
        </nav>
    );
}

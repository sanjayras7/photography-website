'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-serif font-bold tracking-tight z-50 relative">
                    ATOMS
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-gray-600">
                    <Link href="/" className="hover:text-black transition-colors">HOME</Link>
                    <Link href="/gallery" className="hover:text-black transition-colors">GALLERY</Link>
                    <Link href="/about" className="hover:text-black transition-colors">ABOUT</Link>
                    <Link href="/contact" className="hover:text-black transition-colors">CONTACT</Link>
                </div>

                <div className="hidden md:block">
                    <Link
                        href="/contact"
                        className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Book Now
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 relative p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 md:hidden">
                        <Link
                            href="/"
                            className="text-2xl font-medium tracking-wide hover:text-gray-600"
                            onClick={() => setIsOpen(false)}
                        >
                            HOME
                        </Link>
                        <Link
                            href="/gallery"
                            className="text-2xl font-medium tracking-wide hover:text-gray-600"
                            onClick={() => setIsOpen(false)}
                        >
                            GALLERY
                        </Link>
                        <Link
                            href="/about"
                            className="text-2xl font-medium tracking-wide hover:text-gray-600"
                            onClick={() => setIsOpen(false)}
                        >
                            ABOUT
                        </Link>
                        <Link
                            href="/contact"
                            className="text-2xl font-medium tracking-wide hover:text-gray-600"
                            onClick={() => setIsOpen(false)}
                        >
                            CONTACT
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors mt-4"
                            onClick={() => setIsOpen(false)}
                        >
                            Book Now
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

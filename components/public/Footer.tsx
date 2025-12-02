export default function Footer() {
    return (
        <footer className="bg-gray-50 py-12 md:py-20 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-serif font-bold mb-2">ATOMS PHOTOGRAPHY</h3>
                    <p className="text-gray-500 text-sm">Capturing life's most beautiful moments.</p>
                </div>

                <div className="flex gap-8 text-sm text-gray-600">
                    <a href="#" className="hover:text-black">Instagram</a>
                    <a href="#" className="hover:text-black">Twitter</a>
                    <a href="#" className="hover:text-black">Email</a>
                </div>

                <div className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Atoms Photography.
                </div>
            </div>
        </footer>
    )
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white pt-12 pb-24 px-6">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8">Get in Touch</h1>
                <p className="text-xl text-gray-500 mb-12 font-light">
                    I'd love to hear from you. Let's create something beautiful together.
                </p>

                <div className="space-y-8 text-lg">
                    <div>
                        <h3 className="font-bold mb-2">Email</h3>
                        <a href="mailto:hello@atomsphotography.com" className="text-gray-600 hover:text-black transition-colors">
                            hello@atomsphotography.com
                        </a>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">Social</h3>
                        <div className="flex justify-center gap-6 text-gray-600">
                            <a href="#" className="hover:text-black transition-colors">Instagram</a>
                            <a href="#" className="hover:text-black transition-colors">Twitter</a>
                            <a href="#" className="hover:text-black transition-colors">Facebook</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

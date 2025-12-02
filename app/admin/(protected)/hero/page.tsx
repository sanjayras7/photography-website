'use client'

import ImageUploadForm from "@/components/admin/ImageUploadForm"
import TextEditorComponent from "@/components/admin/TextEditorComponent"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function HeroPage() {
    const [heroImage, setHeroImage] = useState<any>(null)

    const fetchHeroImage = async () => {
        const res = await fetch('/api/images?section=HERO')
        const data = await res.json()
        if (data.length > 0) setHeroImage(data[0])
    }

    useEffect(() => {
        fetchHeroImage()
    }, [])

    const handleDelete = async () => {
        if (!heroImage) return
        await fetch(`/api/image/${heroImage.id}`, { method: 'DELETE' })
        setHeroImage(null)
    }

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl font-bold mb-6">Hero Section</h1>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-semibold">Hero Image</h2>

                    {heroImage ? (
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden group">
                            <Image
                                src={heroImage.url}
                                alt="Hero"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Delete Image
                                </button>
                            </div>
                        </div>
                    ) : (
                        <ImageUploadForm
                            section="HERO"
                            onUploadComplete={fetchHeroImage}
                        />
                    )}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-xl font-semibold">Hero Text</h2>
                <TextEditorComponent textKey="HERO_TITLE" label="Main Title" />
                <TextEditorComponent textKey="HERO_SUBTITLE" label="Subtitle" />
            </div>
        </div>
    )
}

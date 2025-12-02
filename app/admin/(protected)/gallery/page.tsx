'use client'

import ImageUploadForm from "@/components/admin/ImageUploadForm"
import DragDropReorderList from "@/components/admin/DragDropReorderList"
import { useState, useEffect } from "react"

export default function GalleryPage() {
    const [images, setImages] = useState<any[]>([])

    const fetchImages = async () => {
        const res = await fetch('/api/images?section=GALLERY')
        const data = await res.json()
        setImages(data)
    }

    useEffect(() => {
        fetchImages()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return
        await fetch(`/api/image/${id}`, { method: 'DELETE' })
        fetchImages()
    }

    const handleReorder = async (newItems: any[]) => {
        setImages(newItems)
        await fetch('/api/reorder', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: newItems.map(i => ({ id: i.id, orderIndex: i.orderIndex })) }),
        })
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-semibold mb-4">Add to Gallery</h2>
                <ImageUploadForm section="GALLERY" onUploadComplete={fetchImages} allowMultiple={true} />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Gallery Images ({images.length})</h2>
                <DragDropReorderList
                    items={images}
                    onDelete={handleDelete}
                    onReorder={handleReorder}
                />
            </div>
        </div>
    )
}

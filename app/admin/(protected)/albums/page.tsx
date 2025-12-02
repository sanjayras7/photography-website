'use client'

import ImageUploadForm from "@/components/admin/ImageUploadForm"
import DragDropReorderList from "@/components/admin/DragDropReorderList"
import { useState, useEffect } from "react"

export default function AlbumsPage() {
    const [images, setImages] = useState<any[]>([])
    const [selectedAlbum, setSelectedAlbum] = useState<string>("")
    const [newAlbum, setNewAlbum] = useState("")
    const [albums, setAlbums] = useState<string[]>([])

    const fetchImages = async () => {
        const res = await fetch('/api/images?section=ALBUM')
        const data = await res.json()
        setImages(data)

        // Extract unique albums
        const uniqueAlbums = Array.from(new Set(data.map((img: any) => img.albumId).filter(Boolean))) as string[]
        setAlbums(uniqueAlbums)

        if (!selectedAlbum && uniqueAlbums.length > 0) {
            setSelectedAlbum(uniqueAlbums[0])
        }
    }

    useEffect(() => {
        fetchImages()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return
        await fetch(`/api/image/${id}`, { method: 'DELETE' })
        fetchImages()
    }

    const handleReorder = async (newItems: any[]) => {
        const currentAlbumImages = newItems
        const otherImages = images.filter(img => img.albumId !== selectedAlbum)
        setImages([...otherImages, ...currentAlbumImages])

        await fetch('/api/reorder', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: currentAlbumImages.map(i => ({ id: i.id, orderIndex: i.orderIndex })) }),
        })
    }

    const filteredImages = images.filter(img => img.albumId === selectedAlbum).sort((a, b) => a.orderIndex - b.orderIndex)

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Albums Management</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 space-y-4">
                <h2 className="text-xl font-semibold">Select or Create Album</h2>
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Select Existing</label>
                        <select
                            value={selectedAlbum}
                            onChange={(e) => setSelectedAlbum(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Select Album --</option>
                            {albums.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Or Create New</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newAlbum}
                                onChange={(e) => setNewAlbum(e.target.value)}
                                className="flex-1 p-2 border rounded"
                                placeholder="New Album Name"
                            />
                            <button
                                onClick={() => {
                                    if (newAlbum) {
                                        setSelectedAlbum(newAlbum)
                                        setAlbums([...albums, newAlbum])
                                        setNewAlbum("")
                                    }
                                }}
                                className="bg-black text-white px-4 py-2 rounded"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {selectedAlbum && (
                <>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                        <h2 className="text-xl font-semibold mb-4">Add to "{selectedAlbum}"</h2>
                        <ImageUploadForm
                            section="ALBUM"
                            albumId={selectedAlbum}
                            onUploadComplete={fetchImages}
                            allowMultiple={true}
                        />
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Images in "{selectedAlbum}"</h2>
                        <DragDropReorderList
                            items={filteredImages}
                            onDelete={handleDelete}
                            onReorder={handleReorder}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

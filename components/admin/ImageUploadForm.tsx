'use client'

import { useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'

interface ImageUploadFormProps {
    section: string
    albumId?: string
    onUploadComplete: () => void
    allowMultiple?: boolean
}

export default function ImageUploadForm({ section, albumId, onUploadComplete, allowMultiple = false }: ImageUploadFormProps) {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return

        setUploading(true)
        setProgress(0)
        const files = Array.from(e.target.files)
        const total = files.length
        let completed = 0

        try {
            for (const file of files) {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('section', section)
                if (albumId) formData.append('albumId', albumId)

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!res.ok) {
                    const err = await res.json()
                    console.error(`Upload failed for ${file.name}:`, err)
                    // Continue with other files or stop? 
                    // Usually better to try all.
                }
                completed++
                setProgress(Math.round((completed / total) * 100))
            }
            onUploadComplete()
        } catch (error) {
            console.error(error)
            alert('Upload process encountered errors')
        } finally {
            setUploading(false)
            setProgress(0)
            e.target.value = ''
        }
    }

    return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
            <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                multiple={allowMultiple}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
            />
            <div className="flex flex-col items-center gap-2 text-gray-500">
                {uploading ? (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 animate-spin mb-2" />
                        <span className="text-sm">{progress}% Uploaded</span>
                    </div>
                ) : (
                    <>
                        <Upload className="w-10 h-10" />
                        <span className="font-medium">
                            {uploading ? 'Uploading...' : `Click to upload ${allowMultiple ? 'images' : 'image'}`}
                        </span>
                        <span className="text-xs text-gray-400">JPG, PNG, WEBP (Max 10MB)</span>
                    </>
                )}
            </div>
        </div>
    )
}

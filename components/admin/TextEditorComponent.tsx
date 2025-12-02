'use client'

import { useState, useEffect } from 'react'

interface TextEditorComponentProps {
    textKey: string
    label: string
    rows?: number
}

export default function TextEditorComponent({ textKey, label, rows = 4 }: TextEditorComponentProps) {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetch(`/api/text/${textKey}`)
            .then(res => res.json())
            .then(data => {
                setValue(data.value || '')
                setLoading(false)
            })
    }, [textKey])

    const handleSave = async () => {
        setSaving(true)
        try {
            await fetch('/api/text/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: textKey, value }),
            })
        } catch (error) {
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="h-24 bg-gray-100 animate-pulse rounded" />

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={rows}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-shadow"
            />
            <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 text-sm font-medium transition-colors"
            >
                {saving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
    )
}

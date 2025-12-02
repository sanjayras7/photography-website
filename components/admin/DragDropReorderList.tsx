'use client'

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useState, useEffect } from 'react'
import { GripVertical, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface Item {
    id: string
    url: string
    s3Key: string
    orderIndex: number
}

interface DragDropReorderListProps {
    items: Item[]
    onDelete: (id: string) => void
    onReorder: (items: Item[]) => void
}

export default function DragDropReorderList({ items: initialItems, onDelete, onReorder }: DragDropReorderListProps) {
    const [items, setItems] = useState(initialItems)

    useEffect(() => {
        setItems(initialItems)
    }, [initialItems])

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const newItems = Array.from(items)
        const [reorderedItem] = newItems.splice(result.source.index, 1)
        newItems.splice(result.destination.index, 0, reorderedItem)

        const updatedItems = newItems.map((item, index) => ({
            ...item,
            orderIndex: index,
        }))

        setItems(updatedItems)
        onReorder(updatedItems)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-wrap gap-6"
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className="relative group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-64"
                                    >
                                        <div className="aspect-video relative">
                                            <Image
                                                src={item.url}
                                                alt="Gallery Image"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-3 flex justify-between items-center bg-white border-t border-gray-100">
                                            <div
                                                {...provided.dragHandleProps}
                                                className="cursor-grab p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
                                            >
                                                <GripVertical className="w-5 h-5" />
                                            </div>
                                            <button
                                                onClick={() => onDelete(item.id)}
                                                className="p-1.5 hover:bg-red-50 text-red-400 hover:text-red-600 rounded transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

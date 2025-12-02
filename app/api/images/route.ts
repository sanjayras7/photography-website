export const dynamic = "force-dynamic";
export const revalidate = 0;
import "server-only";

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ImageSection } from '@prisma/client'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')
    const albumId = searchParams.get('albumId')

    try {
        const where: any = {}
        if (section) where.section = section as ImageSection
        if (albumId) where.albumId = albumId

        const images = await prisma.image.findMany({
            where,
            orderBy: { orderIndex: 'asc' },
        })

        return NextResponse.json(images)
    } catch (error) {
        return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
    }
}

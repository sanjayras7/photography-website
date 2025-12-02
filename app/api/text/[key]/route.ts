export const dynamic = "force-dynamic";
export const revalidate = 0;
import "server-only";

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ key: string }> }
) {
    const { key } = await params
    try {
        const text = await prisma.textContent.findUnique({
            where: { key },
        })
        return NextResponse.json(text || { value: '' })
    } catch (error) {
        return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
    }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
import "server-only";

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { key, value } = await request.json()
        const text = await prisma.textContent.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        })
        return NextResponse.json(text)
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    }
}

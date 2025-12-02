export const dynamic = "force-dynamic";
export const revalidate = 0;
import "server-only";

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { items } = await request.json()

        await prisma.$transaction(
            items.map((item: { id: string; orderIndex: number }) =>
                prisma.image.update({
                    where: { id: item.id },
                    data: { orderIndex: item.orderIndex },
                })
            )
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Reorder error:', error)
        return NextResponse.json({ error: 'Reorder failed' }, { status: 500 })
    }
}

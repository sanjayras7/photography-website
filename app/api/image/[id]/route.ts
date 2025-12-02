export const dynamic = "force-dynamic";
export const revalidate = 0;
import "server-only";

import { NextResponse } from 'next/server'
import { s3Client, S3_BUCKET_NAME } from '@/lib/s3'
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { id } = await params
        const image = await prisma.image.findUnique({
            where: { id },
        })

        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 })
        }

        // Delete from S3
        try {
            await s3Client.send(new DeleteObjectCommand({
                Bucket: S3_BUCKET_NAME,
                Key: image.s3Key,
            }))
        } catch (error) {
            console.error('S3 Delete Error:', error)
            // Continue to delete from DB even if S3 fails, or maybe not?
            // Usually better to keep DB clean.
        }

        // Delete from DB
        await prisma.image.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Delete error:', error)
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    }
}

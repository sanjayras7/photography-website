export const dynamic = "force-dynamic";
export const revalidate = 0;
import "server-only";

import { NextResponse } from 'next/server'
import { s3Client, S3_BUCKET_NAME } from '@/lib/s3'
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ImageSection } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const section = formData.get('section') as string
        const albumId = formData.get('albumId') as string | null

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        const validTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WEBP allowed.' }, { status: 400 })
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
        }

        if (section === 'HERO') {
            const oldHero = await prisma.image.findFirst({ where: { section: 'HERO' } })
            if (oldHero) {
                try {
                    await s3Client.send(new DeleteObjectCommand({
                        Bucket: S3_BUCKET_NAME,
                        Key: oldHero.s3Key,
                    }))
                    await prisma.image.delete({ where: { id: oldHero.id } })
                } catch (e) {
                    console.error("Failed to delete old hero image", e)
                }
            }
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const ext = file.name.split('.').pop()
        const fileName = `${uuidv4()}.${ext}`

        // 🔥 FIXED: Make uploaded object PUBLIC
        const command = new PutObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
            // 👈 REQUIRED
        })

        await s3Client.send(command)

        const url = `https://${S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

        const image = await prisma.image.create({
            data: {
                url,
                s3Key: fileName,
                section: section as ImageSection,
                albumId: albumId || null,
            },
        })

        return NextResponse.json(image)
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}

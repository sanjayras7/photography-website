-- CreateEnum
CREATE TYPE "ImageSection" AS ENUM ('HERO', 'SHOWCASE', 'GALLERY', 'ALBUM');

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "section" "ImageSection" NOT NULL,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "albumId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextContent" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TextContent_key_key" ON "TextContent"("key");

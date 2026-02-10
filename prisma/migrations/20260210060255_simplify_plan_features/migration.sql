/*
  Warnings:

  - You are about to drop the column `featureId` on the `PlanFeature` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `PlanFeature` table. All the data in the column will be lost.
  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `text` to the `PlanFeature` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlanFeature" DROP CONSTRAINT "PlanFeature_featureId_fkey";

-- DropForeignKey
ALTER TABLE "TrainerSocialMedia" DROP CONSTRAINT "TrainerSocialMedia_trainerId_fkey";

-- DropIndex
DROP INDEX "PlanFeature_featureId_idx";

-- DropIndex
DROP INDEX "PlanFeature_planId_featureId_key";

-- AlterTable
ALTER TABLE "PlanFeature" DROP COLUMN "featureId",
DROP COLUMN "value",
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trainer" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Feature";

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GalleryImage_tags_idx" ON "GalleryImage"("tags");

-- AddForeignKey
ALTER TABLE "TrainerSocialMedia" ADD CONSTRAINT "TrainerSocialMedia_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "phone" TEXT NOT NULL,
    "phoneLabel" TEXT NOT NULL DEFAULT 'Get in touch with our team for immediate assistance.',
    "address" TEXT NOT NULL,
    "addressLabel" TEXT NOT NULL DEFAULT 'Come visit our state-of-the-art facility in Pokhara.',
    "email" TEXT NOT NULL,
    "emailLabel" TEXT NOT NULL DEFAULT 'Send us an email and we''ll respond within 24 hours.',
    "instagram" TEXT,
    "facebook" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "youtube" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageCategory_name_key" ON "MessageCategory"("name");

-- CreateIndex
CREATE INDEX "Message_categoryId_idx" ON "Message"("categoryId");

-- CreateIndex
CREATE INDEX "Message_isRead_idx" ON "Message"("isRead");

-- CreateIndex
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MessageCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

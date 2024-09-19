/*
  Warnings:

  - You are about to drop the column `participantId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `responsibleId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `eventId` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_participantId_fkey`;

-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `participantId`,
    ADD COLUMN `responsibleId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `History` MODIFY `categoryId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Participant` DROP COLUMN `password`,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `eventId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Responsible` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `eventId` VARCHAR(191) NULL,
    `createDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Responsible` ADD CONSTRAINT `Responsible_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `Responsible`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

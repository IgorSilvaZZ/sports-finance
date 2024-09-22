/*
  Warnings:

  - You are about to drop the column `eventId` on the `Responsible` table. All the data in the column will be lost.
  - Added the required column `responsibleId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Responsible` DROP FOREIGN KEY `Responsible_eventId_fkey`;

-- AlterTable
ALTER TABLE `Event` ADD COLUMN `responsibleId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Responsible` DROP COLUMN `eventId`;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `Responsible`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

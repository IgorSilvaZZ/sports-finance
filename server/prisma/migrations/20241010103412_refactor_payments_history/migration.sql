/*
  Warnings:

  - You are about to drop the column `categoryId` on the `History` table. All the data in the column will be lost.
  - Added the required column `name` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantId` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datePayment` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_categoryId_fkey`;

-- AlterTable
ALTER TABLE `History` DROP COLUMN `categoryId`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `participantId` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Payments` ADD COLUMN `datePayment` DATETIME(3) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `Participant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

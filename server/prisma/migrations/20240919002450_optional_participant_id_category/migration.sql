-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_participantId_fkey`;

-- AlterTable
ALTER TABLE `Category` MODIFY `participantId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `Participant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

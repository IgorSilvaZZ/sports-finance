/*
  Warnings:

  - Added the required column `dayMonthly` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueMonthly` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` ADD COLUMN `dayMonthly` VARCHAR(191) NOT NULL,
    ADD COLUMN `valueMonthly` DOUBLE NOT NULL;

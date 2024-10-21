/*
  Warnings:

  - You are about to drop the column `monthRef` on the `Payments` table. All the data in the column will be lost.
  - Added the required column `paymentRef` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payments` DROP COLUMN `monthRef`,
    ADD COLUMN `paymentRef` VARCHAR(191) NOT NULL;

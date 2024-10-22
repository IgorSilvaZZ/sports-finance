/*
  Warnings:

  - Added the required column `monthRef` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payments` ADD COLUMN `monthRef` INTEGER NOT NULL;

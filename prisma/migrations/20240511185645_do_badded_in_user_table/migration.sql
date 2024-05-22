/*
  Warnings:

  - Added the required column `date_of_birth` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL;

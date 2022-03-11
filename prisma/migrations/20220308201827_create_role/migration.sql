/*
  Warnings:

  - You are about to drop the column `hierarchy_position` on the `role` table. All the data in the column will be lost.
  - Added the required column `permission_id` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "role" DROP COLUMN "hierarchy_position",
ADD COLUMN     "permission_id" TEXT NOT NULL;

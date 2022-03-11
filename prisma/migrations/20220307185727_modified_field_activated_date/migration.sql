/*
  Warnings:

  - You are about to drop the column `activateDate` on the `equipament` table. All the data in the column will be lost.
  - Added the required column `activated_date` to the `equipament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipament" DROP COLUMN "activateDate",
ADD COLUMN     "activated_date" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,
    "hierarchy_position" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_equipament" ADD CONSTRAINT "user_equipament_fk_id_role_fkey" FOREIGN KEY ("fk_id_role") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
